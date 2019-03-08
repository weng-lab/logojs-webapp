import React from 'react';
import UploadWorkspace from './uploadworkspace';

class TRANSFACWorkspace extends React.Component {

    parseTransfac(text) {
        let inmotif = false;
        let pwms = [], cpwm = [], cmotifname = null;
        let motifnames = [];
        let lines = text.split('\n');
        lines.forEach( (line, i) => {
            if (line.startsWith("DE"))
                cmotifname = line.split("DE")[1].trim();
            else if (line.startsWith("XX")) {
                if (cpwm.length > 0) {
                    pwms.push(cpwm);
                    motifnames.push(cmotifname);
                }
                cpwm = [];
                inmotif = false;
            } else if (line.startsWith("PO"))
                inmotif = true;
            else if (inmotif)
                cpwm.push(line.split('\t').slice(1).map(parseFloat));
        });
        let sum = x => {
            let v = 0.0;
            x.forEach( xx => v += xx );
            return v;
        };
        pwms = pwms.map( pwm => {
            let totals = pwm.map(sum);
            return { pwm: pwm.map( (x, i) => x.map( xx => xx / totals[i] ) ) };
        });
        return {
            pwms,
            motifnames,
            name: null
        };
    }

    render() {
        return <UploadWorkspace parse={this.parseTransfac} title="TRANSFAC"/>;
    }
    
}
export default TRANSFACWorkspace;
