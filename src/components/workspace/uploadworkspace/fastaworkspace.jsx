import React from 'react';
import UploadWorkspace from './uploadworkspace';

import { lookupmap, LOGOCOMPONENTS, fastaToPWM } from '../fastaworkspace/fastaworkspace';

class FASTAWorkspace extends React.Component {

    constructor(props) {
	super(props);
	this.state = {
	    glyphmap: lookupmap(LOGOCOMPONENTS["DNA"].glyphs)
	};
    }
    
    parseFasta(text) {
	return {
	    pwms: [{ pwm: fastaToPWM(text.toUpperCase(), this.state.glyphmap.lookup) }],
	    motifnames: [ null ],
	    name: null
	};
    }

    render() {
        return <UploadWorkspace parse={this.parseFasta.bind(this)} title="FASTA" apiserver={this.props.apiserver} />;
    }
    
}
export default FASTAWorkspace;
