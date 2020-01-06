import { DNAAlphabet } from 'logojs-react';
import { glyphsymbols } from '../../../../common/utils';

let GLYPHSYMBOLS = glyphsymbols();

export const parseTransfac = text => {
    let inmotif = false;
    let results = [], cppm = [], cmotifname = null;
    let motifnames = [];
    let lines = text.split('\n');
    let alphabet = null, alphabets = [];
    lines.forEach( (line, i) => {
        if (line.startsWith("DE"))
            cmotifname = line.split("DE")[1].trim();
        else if (line.startsWith("XX")) {
            if (cppm.length > 0) {
                results.push(cppm);
                motifnames.push(cmotifname);
                alphabets.push(alphabet);
            }
            cppm = [];
            inmotif = false;
        } else if (line.startsWith("PO") || line.startsWith("P0")) {
            inmotif = true;
            alphabet = line.trim().split(/\s+/g).slice(1);
        } else if (inmotif)
            cppm.push(line.trim().split(/\s+/g).slice(1).map(parseFloat));
    });
    let sum = x => {
        let v = 0.0;
        x.forEach( xx => v += xx );
        return v;
    };
    results = results.map( ppm => {
        let totals = ppm.map(sum);
        return { ppm: ppm.map( (x, i) => x.map( xx => xx / totals[i] ) ) };
    });
    return {
        logos: results.map( (result, i) => ({
            ...result,
            name: motifnames[i],
            alphabet: alphabets[i].length === 4 && alphabets[i][0] === 'A' && alphabets[i][1] === 'C' && alphabets[i][2] === 'G' && alphabets[i][3] === 'T' ? DNAAlphabet : alphabet.map( x => GLYPHSYMBOLS[x] || { regex: x, color: "#000000" } )
        })),
        name: null
    };
};
