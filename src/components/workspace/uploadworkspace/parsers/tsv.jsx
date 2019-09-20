import * as os from 'os';
import { DNAAlphabet, ProteinAlphabet } from 'logosj-react';

const alphabets = {
    4: DNAAlphabet,
    20: ProteinAlphabet,
    22: ProteinAlphabet
};

export const parseTSV = text => {
    if (text.includes('[') || text.includes(']') || text.includes(',')) return;
    let lines = text.split(os.EOL).filter(line => line.trim() !== "").map( line => (
        line.trim().split(/\s/g).map(parseFloat).filter(x => !isNaN(x))
    ));
    const lengths = lines.map(x => x.length), min = Math.min(...lengths), max = Math.max(...lengths);
    if (max === min && alphabets[max]) {
        if (max === 20)
            lines = lines.map(line => [ line[0], 0, ...line.slice(1), 0 ])
        return {
            logos: [{ ppm: lines, alphabet: alphabets[max], name: "motif 1" }]
        };
    }
    return { logos: [] };
};
