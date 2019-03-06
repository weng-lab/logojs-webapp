import React from 'react';
import UploadWorkspace from './uploadworkspace';

class MEMEWorkspace extends React.Component {

    parseMeme(text) {
        let inmotif = false;
        let pwms = [], cpwm = [], cmotifname = null;
        let name = null;
        let motifnames = [];
        text.split('\n').forEach( line => {
            if (line.startsWith("letter-probability"))
                inmotif = true;
            else if (line.startsWith("MOTIF"))
                cmotifname = line.split("MOTIF ")[1];
            else if (inmotif && !line.startsWith(' ')) {
                inmotif = false;
                pwms.push(cpwm);
                motifnames.push(cmotifname);
                cpwm = [];
                cmotifname = null;
            } else if (inmotif)
                cpwm.push(line.trim().split(/\s+/).map(parseFloat));
            else if (line.trim().startsWith("DATAFILE="))
                name = line.split("DATAFILE=")[1].trim();
        });
        return {
            pwms,
            motifnames,
            name
        };
    }
    
    render() {
        return <UploadWorkspace parse={this.parseMeme} title="MEME"/>;
    }
    
}
export default MEMEWorkspace;
