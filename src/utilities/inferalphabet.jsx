import { DNAAlphabet, RNAAlphabet, ProteinAlphabet } from 'logojs-react';
import { glyphsymbols } from '../common/utils';

const GLYPHSYMBOLS = glyphsymbols();

const DNASet = new Set([ 'A', 'C', 'G', 'T', 'N' ]);
const RNASet = new Set([ 'A', 'C', 'G', 'U', 'N' ]);
export const ProteinSet = new Set([
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T',
    'V', 'W', 'Y', 'Z'
]);

const difference = (a, b) => (
    [...a].filter(x => !b.has(x))
);

export const inferAlphabet = cmatches => {
    if (difference(cmatches, DNASet).length === 0) return DNAAlphabet;
    if (difference(cmatches, RNASet).length === 0) return RNAAlphabet;
    if (difference(cmatches, ProteinSet).length === 0 && difference(ProteinSet, cmatches).length === 0) return ProteinAlphabet;
    return Array.from(cmatches).map( x => GLYPHSYMBOLS[x] );
};
