import React from 'react';
import { Grid, Menu, Dropdown, Button, Icon } from 'semantic-ui-react';
import { DNALogo, RNALogo, AALogo, Logo, DNAGlyphmap, CompleteGlyphmap, CompleteLogo,
	 RNAGlyphmap, AAGlyphmap, INFORMATION_CONTENT } from 'logos-to-go-react';

import { apiUrls, isArrayOfArrays, TYPEID, glyphsymbols } from '../../../common/utils';

import MotifSelector from './motifselector';
import SettingsPanel from './settings';
import LogoMenu from './menu';
import ErrorMessage from './errormessage';

let GLYPHSYMBOLS = glyphsymbols();

const LOGOCOMPONENTS = {
    DNA: { component: DNALogo, glyphs: DNAGlyphmap, defaultpwm: [[1.0, 0.0, 0.0, 0.0]] },
    RNA: { component: RNALogo, glyphs: RNAGlyphmap, defaultpwm: [[1.0, 0.0, 0.0, 0.0]] },
    AA: { component: AALogo, glyphs: AAGlyphmap, defaultpwm: [[1.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
    custom: { component: CompleteLogo, glyphs: CompleteGlyphmap, defaultpwm: [[1.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] }
};

class UploadWorkspace extends React.Component {

    constructor(props) {
	super(props);
	this.logoPostUrl = apiUrls(props.apiserver).logo("");
	this.state = {
	    pwms: [],
            errors: [],
	    logocomponent: "DNA",
	    mode: INFORMATION_CONTENT,
	    initialized: false,
	    glyphmap: LOGOCOMPONENTS["DNA"].glyphs,
            processed: 0,
            total: 0,
            selectedfile: 0,
            selectedmotif: 0
	};
    }

    _format_logoinfo(state) {
	return {
	    pwm: this.state.pwms[this.state.selectedfile].result.pwms[this.state.selectedmotif].pwm,
	    scale: 1.0,
	    typeid: TYPEID[state.logocomponent],
	    isfreq: state.mode !== INFORMATION_CONTENT,
	    firstbase: 0,
            glyphmap: state.glyphmap
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
	    glyphmap: LOGOCOMPONENTS[data.value].glyphs,
	    pwm
	});
    }

    _glyphmapUpdate(glyphmap) {
	let nglyphmap = [];
	glyphmap.map( v => {
	    let symbol = GLYPHSYMBOLS[v.regex] && GLYPHSYMBOLS[v.regex].component;
	    return symbol && nglyphmap.push({ ...v, component: GLYPHSYMBOLS[v.regex].component });
	});
	this.setState({
	    glyphmap: nglyphmap
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
                processed: this.state.processed + 1
            });
            return;
        }
        reader.onload = e => {
            let result, i = 0;
            while ((!result || !result.pwms) && this.props.parse[i++]) {
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
                    processed: this.state.processed + 1
                });
            } else {
                this.setState({
                    errors: [
                        ...this.state.errors, {
                            file: f,
                            message: "no motifs found - is the file in the correct format?"
                        }
                    ],
                    processed: this.state.processed + 1
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
            processed: this.state.processed + 1
        });
        reader.readAsText(f);
    }

    selectFile(i) {
        this.setState({
            selectedfile: i,
            selectedMotif: 0
        });
    }
    
    errorclosed() {
        this.setState({
            errors: [],
            total: this.state.total - this.state.errors.length,
            processed: this.state.processed - this.state.errors.length
        });
    }

    onItemSelected(i) {
        this.setState({
            selectedmotif: i
        });
    }
    
    async fileReceived(e) {
        this.setState({ total: this.state.total + e.target.files.length });
        Array.from(e.target.files).map(this.parseFile.bind(this));
    }
    
    render() {
        let isdone = this.state.processed === this.state.total
            && this.state.pwms.length > 0;
        let selectedPWMs = this.state.pwms[this.state.selectedfile];
        let selectedGlyphmap = (selectedPWMs && selectedPWMs.result && selectedPWMs.result.pwms
            && selectedPWMs.result.pwms.length > 0 && selectedPWMs.result.pwms[this.state.selectedmotif]
                                && selectedPWMs.result.pwms[this.state.selectedmotif].glyphmap) || this.state.glyphmap;
	return (
	    <React.Fragment>
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
				       glyphmap={selectedGlyphmap}
				       onGlyphmapUpdate={this._glyphmapUpdate.bind(this)} />
		  </Grid.Column>
                  <Grid.Column width={13} style={{ height: '100%' }}>
                    { this.state.errors.length > 0 && (
                        <ErrorMessage errors={this.state.errors} onClick={this.errorclosed.bind(this)}/>
                    )}
                    <Grid textAlign="center" className={isdone ? null : "middle aligned"}
                          style={{ height: "50%" }}>
                      <Grid.Row>
                        <Grid.Column width={16}>
                          { this.state.pwms.length === 0 ? (
                              <Button style={{ fontSize: "24pt", textAlign: "center" }}
                                      onClick={() => this.fileinput.click()}>
                                <Icon style={{fontSize: "72pt", marginLeft: '0em', marginRight: '0em', marginTop: '0.3em' }} name="upload" /><br/>
                                upload {this.props.title} files
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
                                    <span style={{ cursor: "pointer" }}>
                                      <Icon name="download"/>&nbsp;download all as ZIP
                                    </span>
                                    <span style={{ width: '2em' }} />
                                    <span onClick={ () => this.fileinput.click() } style={{ cursor: "pointer" }}>
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
				          logoinfo={this._format_logoinfo({ ...this.state, glyphmap: selectedGlyphmap })} />
			        <div ref={ c => { this.logo = c; } }
                                     style={{ height: "75%", textAlign: "center" }}>
			          <Logo pwm={selectedPWMs.result.pwms[this.state.selectedmotif].pwm}
				        startpos={0}
                                        width="90%" height="75%"
				        mode={this.state.mode}
				        glyphmap={selectedGlyphmap} />
			        </div>
                              </React.Fragment>
                          )}
                          <input type="file" hidden ref={ c => this.fileinput = c }
                                 onChange={this.fileReceived.bind(this)}
                                 multiple />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
		  </Grid.Column>
		</Grid.Row>
	      </Grid>
	    </React.Fragment>
	);
    }
    
};
export default UploadWorkspace;
