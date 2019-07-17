import React from 'react';
import UploadWorkspace from './uploadworkspace';

class JASPARWorkspace extends React.Component {

    parseJaspar(text) {
        let inmotif = false;
        let pwms = [], cpwm = [], cmotifname = null;
        let motifnames = [];
        let lines = text.split('\n');
        lines.forEach( (line, i) => {
            if (line.startsWith('>')) {
                if (cpwm.length > 0) {
                    pwms.push(cpwm);
                    motifnames.push(cmotifname);
                };
                inmotif = true;
                cpwm = [];
                cmotifname = line.replace(/>/, "").replace(/\t/, "");  
            } else if (inmotif && line.includes('[') && line.split('[')[1].includes(']')) {
                cpwm.push(line.split('[')[1].split(']')[0].trim().split(/\s+/));
            }
            if (i === lines.length - 1) {
                pwms.push(cpwm);
                motifnames.push(cmotifname);
            }
        });
        let sum = x => {
            let v = 0.0;
            x.forEach( xx => v += xx );
            return v;
        };
        pwms = pwms.map(pwm => {
            if (pwm.length === 0) { return []; }
            let totals = pwm[0].map( (_, i) => sum(pwm.map(x => +x[i])) );
            let toutput = [];
            for (let j in pwm[0]) {
                toutput.push([]);
                pwm.forEach( () => {
                    toutput[j].push(0.0);
                });
            }
            for (let i in pwm) {
                for (let j in pwm[i]) {
                    toutput[j][i] = +pwm[i][j] / totals[i];
                }
            }
            return toutput;
        });
        return {
            pwms: pwms.filter(x => x.length > 0).map( pwm => ({ pwm }) ),
            motifnames,
            name: null
        };
    }
    
    render() {
        return <UploadWorkspace parse={this.parseJaspar} title="JASPAR" apiserver={this.props.apiserver} />;
    }
    
}
export default JASPARWorkspace;
