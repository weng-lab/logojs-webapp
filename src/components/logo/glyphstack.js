import React from 'react';
import PropTypes from 'prop-types';

import Glyph from '../glyphs/glyph';

class GlyphStack extends React.Component {

    render() {

	/* move up from bottom */
	let cy = this.props.height; // start from bottom with smallest letter
	let xscale = this.props.width / 100.0; // scale to glyphs' 100x100 viewport

	/* stack glyphs in order */
	let glyphs = this.props.indices.map( index => {
	    let G = this.props.glyphmap[index].component;
	    cy -= this.props.lv[index] * 100.0;
	    return (
                <g transform={"translate(0," + cy + ")"} key={index}>
		    <Glyph xscale={xscale} yscale={this.props.lv[index]}>
		        <G fill={this.props.glyphmap[index].color} />
		    </Glyph>
		</g>
	    );
	});

	/* wrap glyphs in g */
	return (
	    <g transform={this.props.transform}>{glyphs}</g>
	);
	
    }
    
};
export default GlyphStack;
