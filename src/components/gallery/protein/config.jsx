import { jsCodestring, formatPPM } from '../../../common/codestrings';
import { PROTEIN_PPM, ALT_PROTEIN_PPM } from '../constants';

const PROTEIN_PPM_CODE = `
const PROTEIN_PPM = ${formatPPM(PROTEIN_PPM)};
`.substring(1);

export const CAP_CODESTRING_JS = jsCodestring(`
${PROTEIN_PPM_CODE}
logosj.embedProteinLogo(document.getElementById("logo"), { ppm: PROTEIN_PPM });
`);

export const CAP_CODESTRING_REACT = `
import { ProteinLogo } from 'logosj-react';
${PROTEIN_PPM_CODE}
export const MyProteinLogo = props => (
    <ProteinLogo ppm={PROTEIN_PPM} />
);
`.substring(1);

const ALT_PPM_CODE = `
const PROTEIN_PPM = ${formatPPM(ALT_PROTEIN_PPM())};
`;

export const ALT_CODESTRING_REACT = `
import { ProteinLogo } from 'logosj-react';
${ALT_PPM_CODE}
export const MyProteinLogo = props => (
    <ProteinLogo ppm={PROTEIN_PPM} />
);
`.substring(1);

export const ALT_CODESTRING_JS = jsCodestring(`
${ALT_PPM_CODE}
logosj.embedProteinLogo(document.getElementById("logo"), { ppm: PROTEIN_PPM });
`);

export const CAP_LONG_DESCRIPTION = `
This logo shows the helix-turn-helix motif of the catabolite activator protein (CAP) family
of DNA binding proteins. By default, LogosJ renders protein logos with amino acids colored
by chemical properties: acidic is red, basic is blue, and non-polar is black. When rendering
the logo, the columns in the weight matrix are ordered alphabetically, starting with A (alanine).
`;

export const ALT_LONG_DESCRIPTION = `
In some cases, asparagine and aspartic acid cannot be distinguished and must be represented
as B. Likewise, when glutamine and glutamic acid cannot be distinguished a Z may be used.
LogosJ protein logos support these symbols too, colored gold by default. When rendering the logo,
B is the second position (index 1) in the matrix, and Z is the final position.
`;

export const PROTEIN_DEMO = {
    reactCodestring: CAP_CODESTRING_REACT,
    jsCodestring: CAP_CODESTRING_JS,
    logoProps: {
        ppm: PROTEIN_PPM
    },
    description: "A default protein logo colors amino acids by chemical properties.",
    header: "Default protein logo",
    longDescription: CAP_LONG_DESCRIPTION
};

export const ALT_DEMO = {
    reactCodestring: ALT_CODESTRING_REACT,
    jsCodestring: ALT_CODESTRING_JS,
    logoProps: {
        ppm: ALT_PROTEIN_PPM()
    },
    description: "A protein logo can use extra symbols to represent indistighuishable N/D (B) and Q/E (Z).",
    header: "Extended amino acid symbol set",
    longDescription: ALT_LONG_DESCRIPTION
};
