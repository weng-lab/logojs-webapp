import React from 'react';
import { Segment, Container, Header } from 'semantic-ui-react';

import { MainMenu, mainMenuItems } from '../../homepage';
import UploadWorkspace from './uploadworkspace';
import MEMEParser from './memexmlparser';
import { lookupmap, LOGOCOMPONENTS, fastaToPWM } from '../fastaworkspace/fastaworkspace';

class AnyUploadWorkspace extends React.Component {

    constructor(props) {
	super(props);
	this.state = {
	    alphabet: lookupmap(LOGOCOMPONENTS["DNA"].glyphs)
	};
    }
    
    parseFasta(text) {
	return {
	    pwms: [{ pwm: fastaToPWM(text.toUpperCase(), this.state.alphabet.lookup) }],
	    motifnames: [ null ],
	    name: null
	};
    }

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
                    toutput[j][i] = +pwm[i][j] / totals[j];
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

    parseMeme(text) {
        try {
            let motifs = this.parseMemeXml(text);
            if (motifs.pwms.length === 0)
                throw new Error("no motifs found");
            return motifs;
        } catch (e) {
            return this.parseMemeTxt(text);
        }
    }
    
    parseMemeXml(xml) {
        let parser = new MEMEParser(xml);
        return {
            ...parser.parseMotifs(),
            name: parser.parseName()
        };
    }
    
    parseMemeTxt(text) {
        let inmotif = false;
        let pwms = [], cpwm = [], cmotifname = null;
        let name = null;
        let motifnames = [];
        let alength = 0;
        text.split('\n').forEach( line => {
            if (line.startsWith("letter-probability")) {
                inmotif = true;
                alength = +line.split("alength= ")[1].split(' ')[0];
            } else if (line.startsWith("MOTIF"))
                cmotifname = line.split("MOTIF ")[1];
            else if (inmotif && line.trim().split(/\s+/).length !== alength) {
                inmotif = false;
                pwms.push({ pwm: cpwm });
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
        const parsers = [
            this.parseMeme,
            this.parseTransfac,
            this.parseJaspar,
            this.parseFasta
        ];
        return (
            <React.Fragment>
              <Segment inverted fixed="top" attached="top">
                <Container>
                  <MainMenu items={mainMenuItems.items} active="Data Upload" fixed={true} />
                </Container>
                <Container style={{ textAlign: "center" }}>
                  <Header as="h1" inverted style={{ fontSize: "2.5em", marginTop: "0.15em" }}>
                    Upload for Batch Generation
                  </Header>
                </Container>
              </Segment>
              <UploadWorkspace parse={parsers.map(x => x.bind(this))}
                               title="MEME, Transfac, JASPAR, or FASTA"
                               apiserver={this.props.apiserver} />
            </React.Fragment>
        );
    }
    
}
export default AnyUploadWorkspace;
