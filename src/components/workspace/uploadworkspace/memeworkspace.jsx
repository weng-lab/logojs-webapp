import React from 'react';
import UploadWorkspace from './uploadworkspace';
import MEMEParser from './memexmlparser';

class MEMEWorkspace extends React.Component {

    
    render() {
        return <UploadWorkspace parse={this.parseMeme.bind(this)} title="MEME" />;
    }
    
}
export default MEMEWorkspace;
