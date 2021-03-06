import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Menu, Dropdown, Button, Icon, Modal } from 'semantic-ui-react';
import { embedLogo, embedLogoWithNegatives, Logo, INFORMATION_CONTENT, LogoWithNegatives } from 'logojs-react';

import { _svgdata } from '../../svgdownload/utils';
import SVGZip from '../../../utilities/zipfile';

import { hasNegatives } from '../../../common/utils';
import MotifSelector from './motifselector';
import SettingsPanel from './settings';
import LogoMenu from './menu';
import ErrorMessage from './errormessage';
import PasteModal from './pastemodal';
import { fastaToPPM } from './parsers/fasta';
import { WorkspaceEditorTabs } from './editor';

export const getImageData = (svgref, canvas, extension, callback) => {
    const image = new Image();
    const data = _svgdata(ReactDOM.findDOMNode(svgref));
    image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(data);
    image.onload = () => {
        const p = data.split('viewBox="0 0 ')[1].split('"')[0].split(' ');
        canvas.width = +p[0];
        canvas.height = +p[1];
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, image.width, image.height);
        context.drawImage(image, 0, 0);
        callback( canvas.toDataURL("image/" + extension).split(',')[1] );
    };
}

const DownloadModal = ({ open, onVectorDownload, onStaticDownload, onClose }) => (
    <Modal open={open} onClose={onClose} style={{ marginTop: '0px' }}>
        <Modal.Header><h2>Select a file format:</h2></Modal.Header>
        <Modal.Content>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2} />
                    <Grid.Column width={3}>
                        <Button style={{ fontSize: "20pt" }} onClick={() => onVectorDownload()}>SVG</Button>
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={2}>
                        <Button style={{ fontSize: "20pt" }} onClick={() => onStaticDownload("jpeg")}>JPEG</Button>
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={2}>
                        <Button style={{ fontSize: "20pt" }} onClick={() => onStaticDownload("png")}>PNG</Button>
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={2}>
                        <Button style={{ fontSize: "20pt" }} onClick={() => onStaticDownload("webp")}>WEBP</Button>
                    </Grid.Column>
                    <Grid.Column width={2} />
                </Grid.Row>
            </Grid>
        </Modal.Content>
        <Modal.Actions>
            <Button onClick={onClose}><Icon className="check" />Done</Button>
        </Modal.Actions>
    </Modal>
);

class UploadWorkspace extends React.Component {

    constructor(props) {
	super(props);
        this.logo = React.createRef();
        this.hiddenLogo = React.createRef();
        this.fileInput = React.createRef();
        this.canvas = React.createRef();
        this.state = {
            logoSets: [],
            errors: [],
            total: 0,
            remaining: 0,
            pasteModalShown: false,
            downloadModalShown: false
        };
    }

    _format_logoinfo(logo) {
	return {
	    ppm: logo.ppm,
            values: logo.ppm,
	    scale: 1.0,
            mode: logo.mode,
            startpos: logo.startpos || 0,
            alphabet: logo.alphabet,
            backgroundFrequencies: logo.backgroundFrequencies,
            yAxisMax: logo.yAxisAuto === false ? logo.yAxisMax : null,
            inverted: logo.inverted,
            negativealpha: logo.negativealpha
	};
    }

    _updateFile(hasNegatives, mode) {
        const nLogo = {
            startpos: this.state.selected.startpos,
            alphabet: this.state.selected.alphabet
        };
        if (!hasNegatives) nLogo.backgroundFrequencies = this.state.selected.backgroundFrequencies;
        if (!hasNegatives) nLogo.mode = mode;
        if (!hasNegatives && mode === INFORMATION_CONTENT) nLogo.yAxisMax = this.state.selected.yAxisAuto === false ? this.state.selected.yAxisMax : null;
        const nSets = [ ...this.state.logoSets ];
        const nLogos = this.state.selectedFile.logos.map( logo => ({
            ...logo,
            ...nLogo,
            ppm: logo.fasta ? fastaToPPM(logo.fasta, true, true, nLogo.alphabet || logo.alphabet) : nLogo.ppm || logo.ppm
        }));
        nSets[this.state.selectedIndex.file] = {
            ...this.state.selectedFile,
            logos: nLogos
        };
        this.setState({
            logoSets: nSets,
            selected: nLogos[this.state.selectedIndex.motif],
            selectedFile: nSets[this.state.selectedIndex.file]
        });
    }

    _updateAll(hasNegatives, mode) {
        const nLogo = {
            startpos: this.state.selected.startpos,
            alphabet: this.state.selected.alphabet
        };
        if (!hasNegatives) nLogo.backgroundFrequencies = this.state.selected.backgroundFrequencies;
        if (!hasNegatives) nLogo.mode = mode;
        if (!hasNegatives && mode === INFORMATION_CONTENT) nLogo.yAxisMax = this.state.selected.yAxisAuto === false ? this.state.selected.yAxisMax : null;
        const nSets = [ ...this.state.logoSets ];
        nSets.forEach( (logoSet, i) => {
            const nLogos = logoSet.logos.map( logo => ({
                ...logo,
                ...nLogo,
                ppm: logo.fasta ? fastaToPPM(logo.fasta, true, true, nLogo.alphabet || logo.alphabet) : nLogo.ppm || logo.ppm
            }));
            nSets[i] = {
                ...logoSet,
                logos: nLogos
            };
        });
        this.setState({
            logoSets: nSets,
            selected: nSets[this.state.selectedIndex.file].logos[this.state.selectedIndex.motif],
            selectedFile: nSets[this.state.selectedIndex.file]
        });
    }
    
    _updateCurrent(nLogo) {
        const nSets = [ ...this.state.logoSets ];
        const nLogos = [ ...this.state.selectedFile.logos ];
        if (this.state.selected.fasta)
            nLogo.ppm = fastaToPPM(this.state.selected.fasta, true, true, nLogo.alphabet || this.state.selected.alphabet).ppm;
        nLogos[this.state.selectedIndex.motif] = {
            ...this.state.selected,
            ...nLogo
        };
        nSets[this.state.selectedIndex.file] = {
            ...this.state.selectedFile,
            logos: nLogos
        };
        this.setState({
            logoSets: nSets,
            selected: nLogos[this.state.selectedIndex.motif],
            selectedFile: nSets[this.state.selectedIndex.file]
        });
    }

    _ppmChange(ppm, fasta) {
        this._updateCurrent({
            ppm,
            fasta
        });
    }

    _alphabetUpdate(alphabet) {
        this._updateCurrent({
            alphabet
        });
    }

    _startPosChange(e, data) {
        this._updateCurrent({
            startpos: +data.value
        });
    }

    _modeChange(e, data) {
        this._updateCurrent({
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
            while ((!result || !result.logos || !result.logos.length) && this.props.parse[i]) {
                result = (this.props.parse[i++])(e.target.result);
            }
            if (Object.keys(result.logos).length !== 0) {
                const selectedFile = {
                    file: f,
                    logos: result.logos
                };
                this.setState({
                    logoSets: [ ...this.state.logoSets, selectedFile ],
                    total: this.state.total + 1,
                    selectedFile,
                    selected: selectedFile.logos[0],
                    selectedIndex: { file: this.state.total, motif: 0 },
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
        if (!this.state.logoSets[i] || !this.state.logoSets[i].logos || !this.state.logoSets[i].logos.length)
            return;
        this.setState({
            selectedFile: this.state.logoSets[i],
            selected: this.state.logoSets[i].logos[0],
            selectedIndex: { file: i, motif: 0 }
        });
    }
    
    errorclosed() {
        this.setState({
            errors: []
        });
    }

    onItemSelected(i) {
        if (!this.state.selectedFile || !this.state.selectedFile.logos || !this.state.selectedFile.logos[i])
            return;
        this.setState({
            selected: this.state.selectedFile.logos[i],
            selectedIndex: { ...this.state.selectedIndex, motif: i }
        });
    }

    downloadStatic(extension) {
        const zip = new SVGZip();
        const folders = [];
        const canvas = this.canvas.current;
        const hiddenLogo = this.hiddenLogo.current;
        const state = this.state;
        const callbacks = [ imageData => {
            folders[0].file((state.logoSets[0].logos[0].name || "motif_1") + "." + extension, imageData, { base64: true });
            hiddenLogo.innerHTML = "";
            zip.download("motifs.zip");
        } ];
        let previous = this.state.logoSets[0].logos[0];
        this.state.logoSets.forEach( (logoSet, j) => {
            folders.push(zip.folder(logoSet.name || logoSet.file.name));
            logoSet.logos.forEach( (logo, i) => {
                if (i === 0 && j === 0) return;
                const lc = callbacks[callbacks.length - 1];
                const pc = { ...previous };
                callbacks.push( imageData => {
                    folders[j].file((logo.name || "motif_" + i) + "." + extension, imageData, { base64: true });
                    hasNegatives(pc.ppm || pc.values) ? embedLogoWithNegatives(hiddenLogo, { ...pc, values: pc.ppm || pc.values }) : embedLogo(hiddenLogo, pc);
                    getImageData(hiddenLogo, canvas, extension, lc);
                } );
                previous = logo;
            });
        });
        hasNegatives(previous.ppm || previous.values) ? embedLogoWithNegatives(hiddenLogo, { ...previous, values: previous.ppm || previous.values }) : embedLogo(hiddenLogo, previous);
        getImageData(hiddenLogo, canvas, extension, callbacks[callbacks.length - 1]);
    }

    async download() {
        let zip = new SVGZip();
        this.state.logoSets.forEach( logoSet => {
            const folder = zip.folder(logoSet.name || logoSet.file.name);
            logoSet.logos.forEach( (logo, i) => {
                hasNegatives(logo.ppm || logo.values) ? embedLogoWithNegatives(this.hiddenLogo.current, { ...logo, values: logo.ppm || logo.values }) : embedLogo(this.hiddenLogo.current, logo);
                folder.file((logo.name || "motif_" + (i + 1)) + ".svg", _svgdata(this.hiddenLogo.current));
            });
        });
        this.hiddenLogo.current.innerHTML = "";
        zip.download("motifs.zip");
    }
    
    async fileReceived(e) {
        this.setState({
            remaining: e.target.files.length
        });
        Array.from(e.target.files).map(this.parseFile.bind(this));
    }

    pasteModalClosed(logos) {
        if (!logos || !logos.length) {
            this.setState({
                pasteModalShown: false
            });
            return;
        }
        const newLogoSet = {
            name: "pasted motif set " + (this.state.total + 1),
            logos
        };
        this.setState({
            pasteModalShown: false,
            logoSets: [
                ...this.state.logoSets,
                newLogoSet
            ],
            total: this.state.total + 1,
            selectedIndex: {
                file: this.state.total,
                motif: 0
            },
            selected: logos[0],
            selectedFile: newLogoSet
        });
    }

    _backgroundUpdate(glyph, value) {
        if (!this.state.selected || !this.state.selected.alphabet || !this.state.selected.alphabet.map) return;
        const map = this._backgroundFrequencyMap();
        map[glyph] = value;
        this._updateCurrent({
            backgroundFrequencies: this.state.selected.alphabet.map( symbol => map[symbol.regex] !== undefined ? map[symbol.regex] : 1.0 / this.state.selected.alphabet.length )
        });
    }
    
    _backgroundFrequencyMap() {
        let map = {};
        this.state.selected && this.state.selected.alphabet && this.state.selected.alphabet.forEach( (symbol, i) => {
            map[symbol.regex] = this.state.selected.backgroundFrequencies && this.state.selected.backgroundFrequencies[i] !== undefined
                ? this.state.selected.backgroundFrequencies[i] : 1.0 / this.state.selected.alphabet.length;
        });
        return map;
    }

    _yAxisToggle(yAxisAuto, yAxisMax) {
        this._updateCurrent({
            yAxisAuto,
            yAxisMax
        });
    }

    _invertedToggle() {
        this._updateCurrent({
            inverted: !this.state.selected.inverted
        });
    }

    _alphaChange(e, { value }) {
        this._updateCurrent({
            negativealpha: value
        });
    }
    
    render() {
        
        let isdone = this.state.remaining === 0 && this.state.logoSets.length > 0;
        let selectedPPMs = this.state.selectedFile && this.state.selectedFile.logos;
        const selectedProps = this.state.selected ? { ...this.state.selected } : {};
        if (selectedProps && selectedProps.yAxisAuto) selectedProps.yAxisMax = null;
        if (selectedProps.fasta) delete selectedProps.fasta;
        
        const defaultMax = this.state.selected && (
            this.state.selected.backgroundFrequencies
                ? Math.max(...this.state.selected.backgroundFrequencies.map( x => Math.log2(1.0 / (x || 0.01))))
                : (this.state.selected.alphabet && Math.log2(this.state.selected.alphabet.length))
        );
        const ppm = this.state.selected && this.state.selected.ppm;
        const alphabet = this.state.selected && this.state.selected.alphabet;
        const _hasNegatives = ppm && hasNegatives(ppm);
        
	return (
	    <React.Fragment>
          <DownloadModal
              open={this.state.downloadModalShown}
              onVectorDownload={this.download.bind(this)}
              onStaticDownload={this.downloadStatic.bind(this)}
              onClose={() => { this.setState({ downloadModalShown: false }); }}
          />
	      <PasteModal open={this.state.pasteModalShown} onClose={this.pasteModalClosed.bind(this)} />
              <Grid className="centered" style={{ width: "90%", marginLeft: "5%", height: "100%" }}>
                <Grid.Row />
                <Grid.Row style={{ height: "100%" }}>
                  { this.state.selected && (
                      <Grid.Column width={3}>
                        <SettingsPanel
                          hasNegatives={_hasNegatives}
                          onApplyToFile={this._updateFile.bind(this)}
                          onApplyToAll={this._updateAll.bind(this)}
                          onStartPosChange={this._startPosChange.bind(this)}
                          mode={(this.state.selected && this.state.selected.mode) || INFORMATION_CONTENT}
                          onModeChange={this._modeChange.bind(this)}
                          startposdefault={this.state.selected && this.state.selected.startpos}
                          alphabet={this.state.selected ? this.state.selected.alphabet : []}
                          backgroundFrequencies={this._backgroundFrequencyMap()}
                          onFrequencyChange={this._backgroundUpdate.bind(this)}
                          onAlphabetUpdate={this._alphabetUpdate.bind(this)}
                          yAxisAuto={this.state.selected && this.state.selected.yAxisAuto !== false}
                          yAxisMax={(this.state.selected && this.state.selected.yAxisMax) || defaultMax}
                          onYAxisToggle={this._yAxisToggle.bind(this)}
                          onInvertedToggle={this._invertedToggle.bind(this)}
                          inverted={this.state.selected && this.state.selected.inverted}
                          onAlphaChange={this._alphaChange.bind(this)}
                          negativeAlpha={this.state.selected && (this.state.selected.negativealpha === undefined ? 255 : this.state.selected.negativealpha)}
                        />
                      </Grid.Column>
                  )}
                  <Grid.Column width={this.state.selected ? 13 : 16} style={{ height: '100%' }}>
                    { this.state.errors && this.state.errors.length > 0 && (
                        <ErrorMessage errors={this.state.errors} onClick={this.errorclosed.bind(this)}/>
                    )}
                    <Grid textAlign="center"
                          style={{ height: "50%" }}>
                      <Grid.Row>
                        <Grid.Column width={16}>
                          { this.state.logoSets.length === 0 ? (
                              <React.Fragment>
                                <Button style={{ fontSize: "24pt", textAlign: "center" }}
                                        onClick={() => this.fileInput.current && this.fileInput.current.click()}>
                                  <Icon style={{fontSize: "52pt", marginLeft: '0em', marginRight: '0em', marginTop: '0.3em' }} name="upload" /><br/>
                                  upload files
                                </Button>
                                <span style={{ fontSize: "3em"}}>or&nbsp;</span>
                                <Button style={{ fontSize: "24pt", textAlign: "center" }}
                                        onClick={() => this.setState({ pasteModalShown: true })}>
                                  <Icon style={{fontSize: "52pt", marginLeft: '0em', marginRight: '0em', marginTop: '0.3em' }} name="paste" /><br/>
                                  paste data
                                </Button>
                              </React.Fragment>
                          ) : isdone && (
                              <React.Fragment>
                                <Menu secondary pointing>
                                  <Dropdown item
                                            text={this.state.selectedFile.name || this.state.selectedFile.file.name}>
                                    <Dropdown.Menu>
                                      {this.state.logoSets.map( (logoSet, i) => (
                                          <Dropdown.Item key={"fileitem_" + i}
                                                         onClick={() => this.selectFile(i)}>
                                            {logoSet.name || logoSet.file.name}
                                          </Dropdown.Item>
                                      ))}
                                    </Dropdown.Menu>
                                  </Dropdown>
                                  <Menu.Item className="floated right">
                                    <span style={{ cursor: "pointer" }} onClick={() => { this.setState({ downloadModalShown: true }); }}>
                                      <Icon name="download" />&nbsp;download all as ZIP
                                    </span>
                                    <span style={{ width: '2em' }} />
                                    <span onClick={ () => this.fileInput.current && this.fileInput.current.click() } style={{ cursor: "pointer" }}>
                                      <Icon name="upload"/>&nbsp;upload files
                                    </span>
                                    <span style={{ width: '2em' }} />
                                    <span onClick={ () => this.setState({ pasteModalShown: true }) } style={{ cursor: "pointer" }}>
                                      <Icon name="paste"/>&nbsp;paste motif data
                                    </span>
                                  </Menu.Item>
                                </Menu>
                                <div style={{ textAlign: "left" }}>
                                  <MotifSelector ppms={selectedPPMs}
                                                 selectedmotif={this.state.selected}
                                                 onItemSelected={this.onItemSelected.bind(this)} />
                                </div>
                                <LogoMenu svgref={this.logo} apiurl={this.logoPostUrl} hidecopy={ppm && alphabet && (ppm.length * alphabet.length > 220)}
                                          logoinfo={this._format_logoinfo(this.state.selected)} />
                              </React.Fragment>
                          )}
                          <div ref={this.hiddenLogo} style={{ display: "none" }} />
                          <canvas ref={this.canvas} style={{ display: "none" }} />
                          <div ref={this.logo}
                               style={{ maxHeight: "500px", height: "20%", textAlign: "center" }}>
                            { isdone && (
                                _hasNegatives ? (
                                    <LogoWithNegatives values={this.state.selected.ppm} {...selectedProps} width="90%" height="100%" />
                                ) : (
                                    <Logo {...selectedProps} width="90%" height="100%" />
                                )
                            )}
                          </div>
                          <div style={{ maxHeight: "500px", height: "30%", textAlign: "center" }}>
                            <WorkspaceEditorTabs
                              id={this.state.selectedIndex}
                              logo={this.state.selected}
                              onPPMChange={this._ppmChange.bind(this)}
                              onFastaChange={this._ppmChange.bind(this)} />
                          </div>
                          <input type="file" hidden ref={this.fileInput}
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
