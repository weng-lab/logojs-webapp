import { DNAAlphabet, RNAAlphabet, ProteinAlphabet } from 'logosj-react';
import { glyphsymbols } from '../../../../common/utils';

let GLYPHSYMBOLS = glyphsymbols();

const inferAlphabet = alphabetHeader => {
    const h = alphabetHeader.split("ALPHABET=")[1].trim();
    if (h === "ACGT") return DNAAlphabet;
    if (h === "ACGU") return RNAAlphabet;
    if (h === "ACDEFGHIKLMNPQRSTVWY") return ProteinAlphabet;
    let retval = [];
    for (let i = 0; i < h.length; ++i) retval.push(GLYPHSYMBOLS[h[i]]);
    return retval;
};

export const parseMeme = text => {
    try {
        let motifs = parseMemeXml(text);
        if (motifs.logos.length === 0)
            throw new Error("no motifs found");
        return motifs;
    } catch (e) {
        return parseMemeTxt(text);
    }
};

const parseBackgroundLine = line => {
    const p = line.split(/\s+/g);
    let result = {};
    for (let i = 0; i < p.length / 2; ++i) {
        const f = +p[i * 2 + 1];
        if (!isNaN(f)) result[p[i * 2]] = f;
    }
    return result;
};

const parseMemeTxt = text => {
    let inmotif = false;
    let results = [], alphabet = [], cppm = [], cmotifname = null;
    let name = null;
    let motifnames = [];
    let alength = 0;
    let inAlphabet = false;
    let backgroundFrequencies = {}, inBackgroundFrequencies = false;
    text.split('\n').forEach( line => {
        if (line.startsWith("letter-probability")) {
            inmotif = true;
            alength = line.split("alength= ")[1] ? +line.split("alength= ")[1].split(' ')[0] : alphabet.length;
            if (alphabet && alphabet.length !== 0) alength = alphabet.length;
        } else if (line.startsWith("MOTIF")) {
            cmotifname = line.split("MOTIF ")[1];
            inBackgroundFrequencies = false;
        } else if (inmotif && (alength !== -1 && line.trim().split(/\s+/).length !== alength)) {
            inmotif = false;
            results.push({ ppm: cppm });
            motifnames.push(cmotifname);
            cppm = [];
            cmotifname = null;
        } else if (inmotif) {
            const values = line.trim().split(/\s+/).map(parseFloat);
            cppm.push(values);
            if (alength < 1) alength = values.length;
        } else if (line.trim().startsWith("DATAFILE="))
            name = line.split("DATAFILE=")[1].trim();
        else if (line.trim().startsWith("ALPHABET="))
            alphabet = inferAlphabet(line);
        else if (line.trim().startsWith("ALPHABET"))
            inAlphabet = true;
        else if (line.trim().startsWith("END ALPHABET"))
            inAlphabet = false;
        else if (inAlphabet)
            alphabet.push(GLYPHSYMBOLS[line.trim()] || { regex: line.trim(), color: "#000000" });
        else if (line.trim().startsWith("Background letter frequencies"))
            inBackgroundFrequencies = true;
        else if (inBackgroundFrequencies)
            backgroundFrequencies = { ...backgroundFrequencies, ...parseBackgroundLine(line.trim()) };
    });
    return {
        logos: results.map( (result, i) => ({
            ...result,
            name: motifnames[i],
            alphabet,
            backgroundFrequencies: alphabet.map( a => backgroundFrequencies[a.regex] === undefined ? 1.0 / alphabet.length : backgroundFrequencies[a.regex] )
        }) ),
        name
    };
};

const parseMemeXml = xml => {
    let parser = new MEMEParser(xml);
    return {
        ...parser.parseMotifs(),
        name: parser.parseName()
    };
};

class MEMEParser {

    constructor(text) {
        this.parser = new DOMParser();
        this.doc = this.parser.parseFromString(text, "text/xml");
        this.alphabet = this.parseAlphabet();
        this.backgroundFrequencies = this.parseBackgroundFrequencies();
    }

    makeAlphabet(ppm, alphabet) {
        let allsymbols = new Set();
        ppm.forEach( pentry => Object.keys(pentry).forEach( key => allsymbols.add(key) ));
        return Array.from(allsymbols).filter(symbol => alphabet[symbol] && GLYPHSYMBOLS[symbol]).map( symbol => ({
            ...GLYPHSYMBOLS[symbol],
            regex: symbol,
            color: '#' + alphabet[symbol].colour.value
        }) );
    }

    collapsePPM(ppm, alphabet) {
        return ppm.map( pentry => (
            alphabet.map( glyph => pentry[glyph.regex] || 0.0)
        ));             
    }

    collapseBackgroundFrequencies(backgroundFrequencies, alphabet) {
        return alphabet.map( glyph => backgroundFrequencies[glyph.regex] );
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

    parseBackgroundFrequencies() {
        let backgroundTag = this.doc.getElementsByTagName("background_frequencies");
        let retval = {};
        if (backgroundTag.length !== 1) return null;
        const childTag = [];
        backgroundTag[0].childNodes.forEach(
            node => { if (node.tagName === "alphabet_array") childTag.push(node); }
        );
        if (childTag.length !== 1) return null;
        childTag[0].childNodes.forEach( node => {
            if (!node.attributes || !node.attributes.letter_id) return;
            retval[node.attributes.letter_id.value] = +node.childNodes[0].nodeValue;
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
        let results = [];
        let motifName = motifAttributes => motifAttributes.id.value + " (" + motifAttributes.name.value + ')';
        motifTags.forEach( motif => {
            let parsed = this.parseMotif(motif);
            let alphabet = this.makeAlphabet(parsed, this.alphabet);
            results.push({
                alphabet,
                backgroundFrequencies: this.collapseBackgroundFrequencies(this.backgroundFrequencies, alphabet),
                ppm: this.collapsePPM(parsed, alphabet),
                name: motifName(motif.attributes)
            });
        });
        return {
            logos: results
        };
    }

    parseName() {
        let trainingSetTag = Array.from(this.doc.getElementsByTagName("training_set"));
        if (trainingSetTag.length !== 1) { return null; }
        return trainingSetTag[0].attributes.datafile && trainingSetTag[0].attributes.datafile.value;
    }
    
}
export default MEMEParser;
