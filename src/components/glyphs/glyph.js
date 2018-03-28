import React from 'react';
import PropTypes from 'prop-types';

class Glyph extends React.Component {

    render() {
	return (
	    <g transform={"scale(" + this.props.xscale + "," + this.props.yscale + ")"}>
		{this.props.children}
	    </g>
	);
    }
    
};
export default Glyph;
