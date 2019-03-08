import { glyphsymbols } from '../../../common/utils';

let GLYPHSYMBOLS = glyphsymbols();

class MEMEParser {

    constructor(text) {
        this.parser = new DOMParser();
        this.doc = this.parser.parseFromString(text, "text/xml");
        this.alphabet = this.parseAlphabet();
    }

    makeGlyphmap(pwm, alphabet) {
        let allsymbols = new Set();
        pwm.forEach( pentry => Object.keys(pentry).forEach( key => allsymbols.add(key) ));
        return Array.from(allsymbols).filter(symbol => alphabet[symbol] && GLYPHSYMBOLS[symbol]).map( symbol => ({
            ...GLYPHSYMBOLS[symbol],
            regex: symbol,
            color: '#' + alphabet[symbol].colour.value
        }) );
    }

    collapsePWM(pwm, glyphmap) {
        return pwm.map( pentry => (
            glyphmap.map( glyph => pentry[glyph.regex] || 0.0)
        ));             
    }
    
    parseAlphabet() {
        let alphabetTag = this.doc.getElementsByTagName("alphabet");
        let retval = {};
        if (alphabetTag.length !== 1) { return null; }
        alphabetTag[0].childNodes.forEach( node => {
            retval[node.id] = node.attributes;
        });
        return retval;
    }

    parseMotif(motif) {
        let probabilityTag = Array.from(motif.childNodes).filter( node => node.nodeName === "probabilities" );
        if (probabilityTag.length !== 1) { return []; }
        let matrixTag = Array.from(probabilityTag[0].childNodes).filter( node => node.nodeName === "alphabet_matrix" );
        if (matrixTag.length !== 1) { return []; }
        return Array.from(matrixTag[0].childNodes).filter( node => node.nodeName === "alphabet_array" ).map( child => {
            let retval = {};
            let letterNodes = Array.from(child.childNodes).filter( node => node.nodeName === "value" );
            letterNodes.forEach( achild => {
                let value = achild.childNodes && achild.childNodes.length ? +achild.childNodes[0].nodeValue : undefined;
                if (value !== undefined)
                    retval[achild.attributes.letter_id.value] = value;
            });
            return retval;
        });
    }
    
    parseMotifs() {
        let motifTags = Array.from(this.doc.getElementsByTagName("motif"));
        let pwms = [], motifnames = [];
        let motifName = motifAttributes => motifAttributes.id.value + " (" + motifAttributes.name.value + ')';
        motifTags.forEach( motif => {
            let parsed = this.parseMotif(motif);
            let glyphmap = this.makeGlyphmap(parsed, this.alphabet);
            motifnames.push(motifName(motif.attributes));
            pwms.push({
                glyphmap,
                pwm: this.collapsePWM(parsed, glyphmap)
            });
        });
        return {
            motifnames,
            pwms
        };
    }

    parseName() {
        let trainingSetTag = Array.from(this.doc.getElementsByTagName("training_set"));
        if (trainingSetTag.length !== 1) { return null; }
        return trainingSetTag[0].attributes.datafile && trainingSetTag[0].attributes.datafile.value;
    }
    
}
export default MEMEParser;
