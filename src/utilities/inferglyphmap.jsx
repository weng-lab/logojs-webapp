import { DNAGlyphmap, RNAGlyphmap, AAGlyphmap, CompleteGlyphmap } from 'logos-to-go-react';

const DNASet = new Set([ 'A', 'C', 'G', 'T' ]);
const RNASet = new Set([ 'A', 'C', 'G', 'U' ]);
export const ProteinSet = new Set([
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T',
    'V', 'W', 'Y', 'Z'
]);

const difference = (a, b) => (
    [...a].filter(x => !b.has(x))
);

export const inferGlyphmap = cmatches => {
    if (difference(cmatches, DNASet).length === 0) return DNAGlyphmap;
    if (difference(cmatches, RNASet).length === 0) return RNAGlyphmap;
    if (difference(cmatches, ProteinSet).length === 0) return AAGlyphmap;
    return CompleteGlyphmap;
};
