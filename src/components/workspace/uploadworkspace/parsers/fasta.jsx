import * as os from 'os';
import { xrange } from 'logosj-react';

import { inferAlphabet } from '../../../../utilities/inferalphabet';

export const lookupmap = alphabet => {
    let ret = {};
    alphabet.map( (x, i) => ret[x.regex] = i );
    return {
	raw: alphabet,
	lookup: ret
    };
};

const smap = (s, f) => (
    xrange(s.length).map( i => f(s.charAt(i), i) )
);

const minMax2DArray = arr => {
    let max = Number.MIN_VALUE, min = Number.MAX_VALUE;
    arr.forEach(e => {
        if (max < e) max = e;
        if (min > e) min = e;
    });
    return { max, min };
};

export const fastaToPWM = (fasta, caseinsensitive, dthrow = true) => {
    let sequences = [], cmatches = new Set();
    if (caseinsensitive) fasta = fasta.toUpperCase();
    fasta.split(os.EOL).filter(x => x[0] !== '#').map(
        x => x[0] !== '>' && x !== '' && sequences.push(x)
    );
    if (sequences.length === 0) { return [[0.0]]; }
    let minlength = minMax2DArray(sequences.map(x => x.length)).min;
    sequences.map( s => ( smap(s, (x, j) => (
        j < minlength && x.match(/^[a-z0-9]+$/i) && cmatches.add(x)
    ))));
    const alphabet = inferAlphabet(cmatches);
    const lookupmap_ = lookupmap(alphabet).lookup;
    let ppm = xrange(minlength).map(i => Object.keys(lookupmap_).map(x => 0));
    let increment = 1.0 / sequences.length;
    sequences.map( s => ( smap(s, (x, j) => {
        if (x === '-' || x === '.' || x === '*') return;
        if (lookupmap_[x] !== undefined || x === 'n' || x === 'N')
	    j < minlength && lookupmap_[x] !== undefined && lookupmap_[x] !== null && (ppm[j][lookupmap_[x]] += increment);
        else if (dthrow)
            throw new Error("unrecognized character '" + x + "'");
    })));
    return {
        ppm,
        fasta,
        alphabet
    };
};

export const parseFasta = text => {
    try {
        return {
            logos: [ fastaToPWM(text.toUpperCase(), true) ],
            name: null
        };
    } catch (e) {
        return {
            logos: []
        };
    }
};
