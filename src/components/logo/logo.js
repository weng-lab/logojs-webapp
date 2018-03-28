import React from 'react';

import { logLikelihood, sortedIndices } from '../../common/utils';
import GlyphStack from './glyphstack';
import XAxis from './xaxis';
import YAxis from './yaxis';

class Logo extends React.Component {
    
    _position(lv, transform, width, height, key) {
	let indices = sortedIndices(lv); // tallest on top
	return (
	    <GlyphStack indices={indices} glyphmap={this.props.glyphmap}
	      lv={lv} transform={transform} width={width} height={height}
	      key={key} />
	);
    }
    
    render() {

	/* compute likelihood; need at least one entry to continue */
	let likelihood = this.props.pwm.map(logLikelihood(this.props.glyphmap.length));
	if (likelihood.length === 0) { return <div />; }

	/* compute scaling factors */
	let alphabetSize = likelihood[0].length;
	let maxHeight = 100.0 * Math.log2(alphabetSize);
	let glyphWidth = maxHeight / 6.0;
	
	return (
	    <svg width={likelihood.length * glyphWidth + 50} height={maxHeight + 60}>
		<XAxis transform={"translate(50," + (maxHeight + 20) + ")"} n={likelihood.length}
	          glyphWidth={glyphWidth} />
		<YAxis transform="translate(0,10)" width="45" height={maxHeight}
	          bits={maxHeight / 100.0} />
		<g transform="translate(50,10)">
	          {likelihood.map( (lv, i) => (
	              this._position(lv, "translate(" + (glyphWidth * i) + ",0)",
				     glyphWidth, maxHeight, i)
	          ))}
  	        </g>
	    </svg>
	);
	
    }
    
};
export default Logo;
