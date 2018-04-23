import React from 'react';
import { DNALogo, RNALogo, AALogo, Logo,
	 INFORMATION_CONTENT } from 'logos-to-go-react';

import { TableHeader, TableContent, MainTable } from '../table/index';
import { PWMEditor } from '../../editor/index';
import { apiUrls, isArrayOfArrays, TYPEID } from '../../../common/utils';

import PWMLogoMenu from './menu';
import PWMSettingsPanel from './settings';
import ContentPanel from './content';

let DEFAULTPWM = "[[0.5, 0.5, 0.0, 0.0],\n [0.0, 0.0, 0.5, 0.5]]";

const LOGOCOMPONENTS = {
    DNA: { component: DNALogo, defaultpwm: [[1.0, 0.0, 0.0, 0.0]] },
    RNA: { component: RNALogo, defaultpwm: [[1.0, 0.0, 0.0, 0.0]] },
    AA: { component: AALogo, defaultpwm: [[1.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
    custom: { component: Logo }
};

class PWMWorkspace extends React.Component {

    constructor(props) {
	super(props);
	this.logoPostUrl = apiUrls(props.config.apiserver).logo("");
	this.state = {
	    pwm: {
		text: DEFAULTPWM,
		parsed: JSON.parse(DEFAULTPWM)
	    },
	    logocomponent: "DNA",
	    scale: 1.0,
	    startpos: 1,
	    mode: INFORMATION_CONTENT,
	    initialized: false
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
	    firstbase: state.startpos
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
	    pwm
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
	let C = LOGOCOMPONENTS[this.state.logocomponent].component;
	return (
	    <MainTable>
	      <TableHeader />
	      <TableContent dimensions={{ height: 95, width: 82 }}>
		<PWMSettingsPanel onLogoTypeChange={this._logoTypeChange.bind(this)}
				  onScaleChange={this._scaleChange.bind(this)}
				  onStartPosChange={this._startPosChange.bind(this)}
				  onModeChange={this._modeChange.bind(this)}
				  logodefault={this.state.logocomponent}
				  scaledefault={this.state.scale}
				  startposdefault={this.state.startpos}
				  modedefault={this.state.mode} />
		<ContentPanel topheight={50}>
		  <PWMEditor
		    height="100%" width="100%"
		    text={this.state.pwm.text}
		    onChange={this._pwmChange.bind(this)} />
		  <React.Fragment>
		    <PWMLogoMenu svgref={this.logo} apiurl={this.logoPostUrl}
				 logoinfo={this._format_logoinfo(this.state)} />
		    <div ref={ c => { this.logo = c; } }>
		      <C pwm={this.state.pwm.parsed}
			 scale={this.state.scale}
			 startpos={this.state.startpos}
			 mode={this.state.mode} />
		    </div>
		  </React.Fragment>
		</ContentPanel>
	      </TableContent>
	    </MainTable>
	);
    }
    
};
export default PWMWorkspace;
