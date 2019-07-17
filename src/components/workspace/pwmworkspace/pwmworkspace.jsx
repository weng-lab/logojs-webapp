import React from 'react';
import { Grid, Container, Segment, Header } from 'semantic-ui-react';
import { DNALogo, RNALogo, AALogo, Logo, DNAGlyphmap, CompleteGlyphmap, CompleteLogo,
	 RNAGlyphmap, AAGlyphmap, INFORMATION_CONTENT, LogoWithNegatives } from 'logos-to-go-react';

import { MainMenu, mainMenuItems } from '../../homepage';
import { PWMEditor } from '../../editor/index';
import { anyNegative, apiUrls, isArrayOfArrays, TYPEID, glyphsymbols } from '../../../common/utils';

import PWMLogoMenu from './menu';
import PWMSettingsPanel from './settings';

let DEFAULTPWM = "[[0.5, 0.5, 0.0, 0.0],\n [0.0, 0.0, 0.5, 0.5]]";
let GLYPHSYMBOLS = glyphsymbols();

const LOGOCOMPONENTS = {
    DNA: { component: DNALogo, glyphs: DNAGlyphmap, defaultpwm: [[1.0, 0.0, 0.0, 0.0]] },
    RNA: { component: RNALogo, glyphs: RNAGlyphmap, defaultpwm: [[1.0, 0.0, 0.0, 0.0]] },
    AA: { component: AALogo, glyphs: AAGlyphmap, defaultpwm: [[1.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
    custom: { component: CompleteLogo, glyphs: CompleteGlyphmap, defaultpwm: [[1.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] }
};

class PWMWorkspace extends React.Component {

    constructor(props) {
	super(props);
	this.logoPostUrl = apiUrls(props.apiserver).logo("");
	this.state = {
	    pwm: {
		text: DEFAULTPWM,
		parsed: JSON.parse(DEFAULTPWM)
	    },
	    logocomponent: "DNA",
	    scale: 1.0,
	    startpos: 1,
	    mode: INFORMATION_CONTENT,
	    initialized: false,
	    glyphmap: LOGOCOMPONENTS["DNA"].glyphs
	};
    }

    componentDidMount() {
	// force re-render after SVG DOM node is created
	this.setState({
	    initialized: true
	});
    }

    _format_logoinfo(state) {
	return {
	    pwm: state.pwm.parsed,
	    typeid: TYPEID[state.logocomponent],
	    scale: state.scale,
	    isfreq: state.mode !== INFORMATION_CONTENT,
	    firstbase: state.startpos,
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
    
    render() {
	let hasNegative = this.state.pwm && this.state.pwm.parsed && this.state.pwm.parsed.length && anyNegative(this.state.pwm.parsed);
	return (
	    <React.Fragment>
              <Segment inverted fixed="top" attached="top">
                <Container>
                  <MainMenu items={mainMenuItems.items} active="Editors" fixed={true} />
                </Container>
                <Container style={{ textAlign: "center" }}>
                  <Header as="h1" inverted style={{ fontSize: "2.5em", marginTop: "0.15em" }}>PWM Editor</Header>
                </Container>
              </Segment>
	      <Grid className="centered" style={{ height: "100%", width: "90%", marginLeft: "5%" }}>
                <Grid.Row />
		<Grid.Row style={{ height: "100%" }}>
		  <Grid.Column width={3}>
		    <PWMSettingsPanel onLogoTypeChange={this._logoTypeChange.bind(this)}
				      onScaleChange={this._scaleChange.bind(this)}
				      onStartPosChange={this._startPosChange.bind(this)}
				      onModeChange={this._modeChange.bind(this)}
				      logodefault={this.state.logocomponent}
				      scaledefault={this.state.scale}
				      startposdefault={this.state.startpos}
				      modedefault={this.state.mode}
				      glyphmap={this.state.glyphmap}
				      onGlyphmapUpdate={this._glyphmapUpdate.bind(this)}
				      hasnegative={hasNegative} />
		  </Grid.Column>
	          <Grid.Column width={13} style={{ height: '100%' }}>
		    <Grid style={{ height: '100%' }}>
		      <Grid.Row style={{ height: '40%' }}>
			<Grid.Column width={16}>
			  <PWMEditor
			    height="100%" width="100%"
			    text={this.state.pwm.text}
			    onChange={this._pwmChange.bind(this)} />
			</Grid.Column>
		      </Grid.Row>
	              <Grid.Row style={{ height: '60%' }}>
			<Grid.Column width={16} style={{ height: "100%" }}>
			  <PWMLogoMenu svgref={this.logo} apiurl={this.logoPostUrl}
				       logoinfo={this._format_logoinfo(this.state)} />
			  <div ref={ c => { this.logo = c; } }
                            style={{ height: "75%", textAlign: "center" }}>
			    { hasNegative ? (
				<LogoWithNegatives pwm={this.state.pwm.parsed}
						   startpos={this.state.startpos}
						   mode={this.state.mode}
						   width="90%" height="75%"
						   glyphmap={this.state.glyphmap}/>
			    ) : (
				<Logo pwm={this.state.pwm.parsed}
				      startpos={this.state.startpos}
				      mode={this.state.mode}
				      width="90%" height="75%"
				      glyphmap={this.state.glyphmap} />
			    )}
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
export default PWMWorkspace;
