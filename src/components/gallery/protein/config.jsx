import { jsCodestring, formatPWM } from '../../../common/codestrings';
import { PROTEIN_PWM, ALT_PROTEIN_PWM } from '../constants';

const PROTEIN_PWM_CODE = `
const PROTEIN_PWM = ${formatPWM(PROTEIN_PWM)};
`.substring(1);

export const CAP_CODESTRING_JS = jsCodestring(`
${PROTEIN_PWM_CODE}
logosj.embedProteinLogo(document.getElementById("logo"), { pwm: CAP_PWM });
`);

export const CAP_CODESTRING_REACT = `
import { ProteinLogo } from 'logosj-react';
${PROTEIN_PWM_CODE}
export const ProteinLogo = props => (
    <ProteinLogo pwm={PROTEIN_PWM} />
);
`.substring(1);

const ALT_PWM_CODE = `
const PROTEIN_PWM = ${formatPWM(ALT_PROTEIN_PWM())};
`;

export const ALT_CODESTRING_REACT = `
import { ProteinLogo } from 'logosj-react';
${ALT_PWM_CODE}
export const ProteinLogo = props => (
    <ProteinLogo pwm={ALT_PWM} />
);
`.substring(1);

export const ALT_CODESTRING_JS = jsCodestring(`
${ALT_PWM_CODE}
logosj.embedProteinLogo(document.getElementById("logo"), { pwm: ALT_PWM });
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
        pwm: PROTEIN_PWM
    },
    description: "A default protein logo colors amino acids by chemical properties.",
    header: "Default protein logo",
    longDescription: CAP_LONG_DESCRIPTION
};

export const ALT_DEMO = {
    reactCodestring: ALT_CODESTRING_REACT,
    jsCodestring: ALT_CODESTRING_JS,
    logoProps: {
        pwm: ALT_PROTEIN_PWM()
    },
    description: "A protein logo can use extra symbols to represent indistighuishable N/D (B) and Q/E (Z).",
    header: "Extended amino acid symbol set",
    longDescription: ALT_LONG_DESCRIPTION
};
