import React from 'react';
import { Grid, Menu, Dropdown, Button, Icon } from 'semantic-ui-react';
import { DNALogo, RNALogo, ProteinLogo, Logo, DNAAlphabet, CompleteAlphabet, CompleteLogo,
	 RNAAlphabet, ProteinAlphabet, INFORMATION_CONTENT, embedLogo } from 'logosj-react';

import { apiUrls, isArrayOfArrays, TYPEID, glyphsymbols } from '../../../common/utils';
import { _svgdata } from '../../svgdownload/utils';
import SVGZip from '../../../utilities/zipfile';

import MotifSelector from './motifselector';
import SettingsPanel from './settings';
import LogoMenu from './menu';
import ErrorMessage from './errormessage';

let GLYPHSYMBOLS = glyphsymbols();

const LOGOCOMPONENTS = {
    DNA: { component: DNALogo, glyphs: DNAAlphabet, defaultpwm: [[1.0, 0.0, 0.0, 0.0]] },
    RNA: { component: RNALogo, glyphs: RNAAlphabet, defaultpwm: [[1.0, 0.0, 0.0, 0.0]] },
    AA: { component: ProteinLogo, glyphs: ProteinAlphabet, defaultpwm: [[1.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
    custom: { component: CompleteLogo, glyphs: CompleteAlphabet, defaultpwm: [[1.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] }
};

class UploadWorkspace extends React.Component {

    constructor(props) {
	super(props);
	this.logoPostUrl = apiUrls(props.apiserver).logo("");
        this.logo = React.createRef();
        this.hiddenlogo = React.createRef();
        this.fileinput = React.createRef();
	this.state = {
	    pwms: [],
            errors: [],
	    logocomponent: "DNA",
	    mode: INFORMATION_CONTENT,
	    initialized: false,
	    alphabet: LOGOCOMPONENTS["DNA"].glyphs,
            total: 0,
            selectedfile: 0,
            selectedmotif: 0,
            remaining: 0
	};
    }

    _format_logoinfo(state) {
        const pwm = this.state.pwms[this.state.selectedfile].result.pwms[this.state.selectedmotif].pwm;
	return {
	    pwm: pwm.pwm ? pwm.pwm : pwm,
	    scale: 1.0,
	    typeid: TYPEID[state.logocomponent],
	    isfreq: state.mode !== INFORMATION_CONTENT,
            mode: state.mode,
            startpos: 0,
	    firstbase: 0,
            alphabet: state.alphabet,
	};
    }
    
    _pwmChange(pwm) {
	if (isArrayOfArrays(pwm.parsed)) {
	    this.setState({
		pwm
	    });
	}
    }
    
    _logoTypeChange(e, data) {
	let pwm = {
	    text: JSON.stringify(LOGOCOMPONENTS[data.value].defaultpwm),
	    parsed: LOGOCOMPONENTS[data.value].defaultpwm
	};
	if (pwm.parsed && pwm.parsed.length && this.state.pwm.parsed.length
	    && pwm.parsed[0].length === this.state.pwm.parsed[0].length) {
	    pwm = this.state.pwm;
	}
	this.setState({
	    logocomponent: data.value,
	    alphabet: LOGOCOMPONENTS[data.value].glyphs,
	    pwm
	});
    }

    _alphabetUpdate(alphabet) {
	let nalphabet = [];
	alphabet.map( v => {
	    let symbol = GLYPHSYMBOLS[v.regex] && GLYPHSYMBOLS[v.regex].component;
	    return symbol && nalphabet.push({ ...v, component: GLYPHSYMBOLS[v.regex].component });
	});
        const npwms = [ ...this.state.pwms ];
        npwms[this.state.selectedfile] = {
            ...npwms[this.state.selectedfile],
            result: {
                ...npwms[this.state.selectedfile].result,
                pwms: [ ...npwms[this.state.selectedfile].result.pwms ]
            }
        };
        npwms[this.state.selectedfile].result.pwms[this.state.selectedmotif] = {
            ...npwms[this.state.selectedfile].result.pwms[this.state.selectedmotif],
            alphabet: nalphabet
        };
	this.setState({
	    alphabet: nalphabet,
            pwms: npwms
	});
    }

    _scaleChange(e, data) {
	this.setState({
	    scale: +data.value
	});
    }

    _startPosChange(e, data) {
	this.setState({
	    startpos: +data.value
	});
    }

    _modeChange(e, data) {
	this.setState({
	    mode: data.value
	});
    }
    
    async parseFile(f) {
        const reader = new FileReader();
        if (f.size > 100000000) {
            this.setState({
                errors: [
                    ...this.state.errors, {
                        file: f,
                        message: "file too large (size limit is 100MB)"
                    }
                ],
                remaining: this.state.remaining - 1
            });
            return;
        }
        reader.onload = e => {
            let result, i = 0;
            while ((!result || !result.pwms || !result.pwms.length) && this.props.parse[i]) {
                result = (this.props.parse[i++])(e.target.result);
            }
            if (Object.keys(result.pwms).length !== 0) {
                this.setState({
                    pwms: [
                        ...this.state.pwms, {
                            file: f,
                            result
                        }
                    ],
                    total: this.state.total + 1,
                    selectedfile: this.state.total,
                    selectedmotif: 0,
                    remaining: this.state.remaining - 1
                });
            } else {
                this.setState({
                    errors: [
                        ...this.state.errors, {
                            file: f,
                            message: "no motifs found - is the file in the correct format?"
                        }
                    ],
                    remaining: this.state.remaining - 1
                });
            }
        };
        reader.onerror = e => this.setState({
            errors: [
                ...this.state.errors, {
                    file: f,
                    message: "reading failed - is the file in the correct format?"
                }
            ],
            remaining: this.state.remaining - 1
        });
        reader.readAsText(f);
    }

    selectFile(i) {
        this.setState({
            selectedfile: i,
            selectedmotif: 0
        });
    }
    
    errorclosed() {
        this.setState({
            errors: []
        });
    }

    onItemSelected(i) {
        this.setState({
            selectedmotif: i
        });
    }

    async download() {
        let zip = new SVGZip();
        this.state.pwms.forEach( pwmfile => {
            const folder = zip.folder(pwmfile.result.name || pwmfile.file.name);
            pwmfile.result.pwms.forEach( (pwm, i) => {
                embedLogo(this.hiddenlogo.current, {
                    pwm: pwm.pwm,
		    startpos: 0,
		    mode: this.state.mode,
		    alphabet: pwm.alphabet || this.state.alphabet
                });
                folder.file((pwmfile.result.motifnames[i] || "motif_" + (i + 1)) + ".svg", _svgdata(this.hiddenlogo.current));
            });
        });
        this.hiddenlogo.current.innerHTML = "";
        zip.download("motifs.zip");
    }
    
    async fileReceived(e) {
        this.setState({
            remaining: e.target.files.length
        });
        Array.from(e.target.files).map(this.parseFile.bind(this));
    }
    
    render() {
        let isdone = this.state.remaining === 0 && this.state.pwms.length > 0;
        let selectedPWMs = this.state.pwms[this.state.selectedfile];
        let selectedAlphabet = (selectedPWMs && selectedPWMs.result && selectedPWMs.result.pwms
                                && selectedPWMs.result.pwms.length > 0 && selectedPWMs.result.pwms[this.state.selectedmotif]
                                && selectedPWMs.result.pwms[this.state.selectedmotif].alphabet) || this.state.alphabet;
	return (
	    <Grid className="centered" style={{ width: "90%", marginLeft: "5%", height: "100%" }}>
              <Grid.Row />
	      <Grid.Row style={{ height: "100%" }}>
		<Grid.Column width={3}>
		  <SettingsPanel onLogoTypeChange={this._logoTypeChange.bind(this)}
				 onScaleChange={this._scaleChange.bind(this)}
				 onStartPosChange={this._startPosChange.bind(this)}
				 onModeChange={this._modeChange.bind(this)}
				 logodefault={this.state.logocomponent}
				 scaledefault={this.state.scale}
				 startposdefault={this.state.startpos}
				 modedefault={this.state.mode}
				 alphabet={selectedAlphabet}
				 onAlphabetUpdate={this._alphabetUpdate.bind(this)} />
		</Grid.Column>
                <Grid.Column width={13} style={{ height: '100%' }}>
                  { this.state.errors.length > 0 && (
                      <ErrorMessage errors={this.state.errors} onClick={this.errorclosed.bind(this)}/>
                  )}
                  <Grid textAlign="center"
                        style={{ height: "50%" }}>
                    <Grid.Row>
                      <Grid.Column width={16}>
                        { this.state.pwms.length === 0 ? (
                            <Button style={{ fontSize: "24pt", textAlign: "center" }}
                                    onClick={() => this.fileinput.current && this.fileinput.current.click()}>
                              <Icon style={{fontSize: "52pt", marginLeft: '0em', marginRight: '0em', marginTop: '0.3em' }} name="upload" /><br/>
                              upload files
                            </Button>
                        ) : isdone && (
                            <React.Fragment>
                              <Menu secondary pointing>
                                <Dropdown item
                                          text={selectedPWMs.result.name || selectedPWMs.file.name}>
                                  <Dropdown.Menu>
                                    {this.state.pwms.map( (pwmset, i) => (
                                        <Dropdown.Item key={"fileitem_" + i}
                                                       onClick={() => this.selectFile(i)}>
                                          {pwmset.result.name || pwmset.file.name}
                                        </Dropdown.Item>
                                    ))}
                                  </Dropdown.Menu>
                                </Dropdown>
                                <Menu.Item className="floated right">
                                  <span style={{ cursor: "pointer" }} onClick={this.download.bind(this)}>
                                    <Icon name="download" />&nbsp;download all as ZIP
                                  </span>
                                  <span style={{ width: '2em' }} />
                                  <span onClick={ () => this.fileinput.current && this.fileinput.current.click() } style={{ cursor: "pointer" }}>
                                    <Icon name="upload"/>&nbsp;upload more
                                  </span>
                                </Menu.Item>
                              </Menu>
			      <div style={{ textAlign: "left" }}>
                                <MotifSelector pwms={selectedPWMs}
                                               selectedmotif={this.state.selectedmotif}
                                               onItemSelected={this.onItemSelected.bind(this)} />
			      </div>
                              <LogoMenu svgref={this.logo} apiurl={this.logoPostUrl}
				        logoinfo={this._format_logoinfo({ ...this.state, alphabet: selectedAlphabet })} />
                            </React.Fragment>
                        )}
                        <div ref={this.hiddenlogo} style={{ display: "none" }} />
                        <div ref={this.logo}
                             style={{ maxHeight: "500px", height: "50%", textAlign: "center" }}>
	                  { isdone && (<Logo pwm={selectedPWMs.result.pwms[this.state.selectedmotif].pwm.pwm ? selectedPWMs.result.pwms[this.state.selectedmotif].pwm.pwm : selectedPWMs.result.pwms[this.state.selectedmotif].pwm}
			                     startpos={0}
                                             width="90%" height="75%"
			                     mode={this.state.mode}
			                     alphabet={selectedAlphabet} />)}
			</div>
                        <input type="file" hidden ref={this.fileinput}
                               onChange={this.fileReceived.bind(this)}
                               multiple />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
		</Grid.Column>
	      </Grid.Row>
	    </Grid>
	);
    }
    
};
export default UploadWorkspace;
