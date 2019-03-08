import React from 'react';
import os from 'os';
import { DNALogo, RNALogo, AALogo, Logo, CompleteLogo,
	 DNAGlyphmap, RNAGlyphmap, AAGlyphmap, CompleteGlyphmap,
	 INFORMATION_CONTENT, xrange } from 'logos-to-go-react';
import { Grid } from 'semantic-ui-react';

import { FastaEditor } from '../../editor/index';
import { apiUrls, TYPEID, glyphsymbols } from '../../../common/utils';

import FastaLogoMenu from './menu';
import FastaSettingsPanel from './settings';

const _lookupmap = glyphmap => {
    let ret = {};
    glyphmap.map( (x, i) => ret[x.regex] = i );
    return {
	raw: glyphmap,
	lookup: ret
    };
};

const smap = (s, f) => (
    xrange(s.length).map( i => f(s.charAt(i), i) )
);

const DNADEFAULT = `
>sequence 1
GATTACA
>sequence 2
GATTACA
>sequence 3
GATTACA
`.substring(1);

const RNADEFAULT = `
>sequence 1
GAUUACA
>sequence 2
GAUUACA
>sequence 3
GAUUACA
`.substring(1);

const PROTEINDEFAULT = `
>sequence 1
AMINQACID
>sequence 2
AMINQACID
>sequence 3
AMINQACID
`.substring(1);

const CUSTOMDEFAULT = `
>sequence 1
CUSTOM
`.substring(1);

let GLYPHSYMBOLS = glyphsymbols();

const LOGOCOMPONENTS = {
    DNA: { component: DNALogo, glyphs: DNAGlyphmap, defaulttext: DNADEFAULT },
    RNA: { component: RNALogo, glyphs: RNAGlyphmap, defaulttext: RNADEFAULT },
    AA: { component: AALogo, glyphs: AAGlyphmap, defaulttext: PROTEINDEFAULT },
    custom: { component: CompleteLogo, glyphs: CompleteGlyphmap, defaulttext: CUSTOMDEFAULT }
};

const fastaToPWM = (fasta, lookupmap) => {
    let sequences = [];
    fasta.split(os.EOL).filter(x => x[0] !== '#').map(
        x => x[0] !== '>' && x !== '' && sequences.push(x)
    );
    if (sequences.length === 0) { return [[0.0]]; }
    let minlength = Math.min(...sequences.map(x => x.length));
    let pwm = xrange(minlength).map(i => Object.keys(lookupmap).map(x => 0));
    let increment = 1.0 / sequences.length;
    sequences.map( s => ( smap(s, (x, j) => (
	j < minlength && (pwm[j][lookupmap[x]] += increment)
    ))));
    return pwm;
};

class FastaWorkspace extends React.Component {

    constructor(props) {
	super(props);
	this.logoPostUrl = apiUrls(props.apiserver).logo("");
	this.state = {
	    fasta: DNADEFAULT,
	    logocomponent: "DNA",
	    scale: 1.0,
	    startpos: 1,
	    mode: INFORMATION_CONTENT,
	    initialized: false,
	    glyphmap:  _lookupmap(LOGOCOMPONENTS["DNA"].glyphs)
	};
    }

    componentDidMount() {
	// force re-render after SVG DOM node is created
	this.setState({
	    initialized: true
	});
    }

    _format_logoinfo(state, pwm) {
	return {
	    pwm,
	    typeid: TYPEID[state.logocomponent],
	    scale: state.scale,
	    isfreq: state.mode !== INFORMATION_CONTENT,
	    firstbase: state.startpos
	};
    }
    
    _fastaChange(fasta) {
	this.setState({
	    fasta: fasta.toUpperCase()
	});
    }

    _logoTypeChange(e, data) {
	this.setState({
	    logocomponent: data.value,
	    fasta: LOGOCOMPONENTS[data.value].defaulttext,
	    glyphmap: _lookupmap(LOGOCOMPONENTS[data.value].glyphs)
	});
    }

    _glyphmapUpdate(glyphmap) {
	let nglyphmap = [];
	glyphmap.map( v => {
	    let symbol = GLYPHSYMBOLS[v.regex] && GLYPHSYMBOLS[v.regex].component;
	    return symbol && nglyphmap.push({ ...v, component: GLYPHSYMBOLS[v.regex].component });
	});
	this.setState({
	    glyphmap: _lookupmap(nglyphmap)
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
    
    render() {
	let pwm = fastaToPWM(this.state.fasta, this.state.glyphmap.lookup);
	return (
            <React.Fragment>
	      <Grid className="centered" style={{ height: "100%" }}>
	        <Grid.Row style={{ backgroundColor: "#eee" }}>
	          <Grid.Column width={3} style={{ textAlign: "center" }}>
	            <h1 className="inverted center aligned" style={{ color: "#000", fontSize: "28pt", marginTop: "5px" }}>FASTA Editor</h1>
	          </Grid.Column>
		</Grid.Row>
		<Grid.Row style={{ height: "100%" }}>
		  <Grid.Column width={3}>
		    <FastaSettingsPanel onLogoTypeChange={this._logoTypeChange.bind(this)}
				        onScaleChange={this._scaleChange.bind(this)}
				        onStartPosChange={this._startPosChange.bind(this)}
				        onModeChange={this._modeChange.bind(this)}
				        logodefault={this.state.logocomponent}
				        scaledefault={this.state.scale}
				        startposdefault={this.state.startpos}
				        modedefault={this.state.mode}
				        glyphmap={this.state.glyphmap.raw}
	                                onGlyphmapUpdate={this._glyphmapUpdate.bind(this)} />
            	  </Grid.Column>
	          <Grid.Column width={13} style={{ height: '100%' }}>
		    <Grid style={{ height: '100%' }}>
		      <Grid.Row style={{ height: '40%' }}>
			<Grid.Column width={16}>
		          <FastaEditor
		            height="100%" width="100%"
		            text={this.state.fasta}
	                    onChange={this._fastaChange.bind(this)}
	                    id="fastamain" glyphmap={this.state.glyphmap.raw} />
            		</Grid.Column>
		      </Grid.Row>
	              <Grid.Row style={{ height: '60%' }}>
			<Grid.Column width={16} style={{ height: '100%' }}>
		          <FastaLogoMenu svgref={this.logo} logoinfo={this._format_logoinfo(this.state, pwm)}
				         apiurl={this.logoPostUrl} />
		          <div ref={ c => { this.logo = c; } }
                               style={{ height: '75%', textAlign: "center" }}>
                            <Logo pwm={pwm}
			          startpos={this.state.startpos}
			          mode={this.state.mode}
                                  scale="75%"
			          glyphmap={this.state.glyphmap.raw} />
	                  </div>
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
export default FastaWorkspace;
