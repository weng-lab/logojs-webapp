import { CompleteAlphabet } from 'logos-to-go-react';

import { jsCodestring, formatPWM, formatAlphabet } from '../../../common/codestrings';
import { METHYL_PWM, METHYL_ALPHABET, RNA_PWM, HEX_PWM, HEX_ALPHABET } from '../constants';

const METHYL_CONSTANTS = `
const METHYL_PWM = ${formatPWM(METHYL_PWM)};
const METHYL_ALPHABET = ${formatAlphabet(METHYL_ALPHABET)};
`.substring(1);

export const METHYL_CODESTRING_JS = jsCodestring(`
${METHYL_CONSTANTS}
logosj.embedLogo(document.getElementById("logo"), {
  pwm: METHYL_PWM,
  alphabet: METHYL_ALPHABET
});
`);

export const METHYL_CODESTRING_REACT = `
import { Logo } from 'logosj-react';
${METHYL_CONSTANTS}
export const MethylLogo = props => (
    <Logo pwm={METHYL_PWM} alphabet={METHYL_ALPHABET} />
);
`.substring(1);

export const METHYL_LONG_DESCRIPTION = `
A DNA logo may be extended to use the symbols M and W to represent CpG methylation on the
plus and minus strands, respectively. This logo illustrates the use of a custom alphabet to
render such a logo. Note in the code that the columns in the matrix correspond to A, C, G,
T, M, then W; this order is determined by the custom alphabet array order and does not need to
be alphabetical, although it can be.
`;

export const METHYL_DEMO = {
    reactCodestring: METHYL_CODESTRING_REACT,
    jsCodestring: METHYL_CODESTRING_JS,
    logoProps: {
        pwm: METHYL_PWM,
        alphabet: METHYL_ALPHABET
    },
    description: "A DNA logo can be extended to show CpG methylation.",
    header: "CpG methylation",
    longDescription: METHYL_LONG_DESCRIPTION
};

const RNA_CONSTANTS = `
const RNA_PWM = ${formatPWM(RNA_PWM)};
`.substring(1);

export const RNA_CODESTRING_JS = jsCodestring(`
${RNA_CONSTANTS}
logosj.embedRNALogo(document.getElementById("logo"), {
  pwm: RNA_PWM
});
`);

export const RNA_CODESTRING_REACT = `
import { RNALogo } from 'logosj-react';
${RNA_CONSTANTS}
export const MyRNALogo = props => (
    <RNALogo pwm={RNA_PWM} />
);
`.substring(1);

export const RNA_LONG_DESCRIPTION = `
LogosJ supports RNA logos by default as shown here. The default coloring mimics that of DNA,
and the matrix order in the code is alphabetical (A, C, G, U).
`;

export const RNA_DEMO = {
    reactCodestring: RNA_CODESTRING_REACT,
    jsCodestring: RNA_CODESTRING_JS,
    logoProps: {
        pwm: RNA_PWM,
        rna: true
    },
    description: "A logo can use an RNA alphabet.",
    header: "RNA logo",
    longDescription: RNA_LONG_DESCRIPTION
};

const HEX_CONSTANTS = `
const CUSTOM_PWM = ${formatPWM(HEX_PWM())};
const CUSTOM_ALPHABET = ${formatAlphabet(HEX_ALPHABET)};
`.substring(1);

export const HEX_CODESTRING_JS = jsCodestring(`
${HEX_CONSTANTS}
logosj.embedLogo(document.getElementById("logo"), {
  pwm: CUSTOM_PWM,
  alphabet: CUSTOM_ALPHABET
});
`);

export const HEX_CODESTRING_REACT = `
import { Logo } from 'logosj-react';
${HEX_CONSTANTS}
export const MyRNALogo = props => (
    <Logo pwm={CUSTOM_PWM} alphabet={CUSTOM_ALPHABET} />
);
`.substring(1);

export const HEX_LONG_DESCRIPTION = `
LogosJ supports all the letters of the English alphabet, both upper case and lower case, as well
as the digits 0-9. You can use any combination of these symbols in your logos by defining custom
alphabets.
`;

export const HEX_DEMO = {
    reactCodestring: HEX_CODESTRING_REACT,
    jsCodestring: HEX_CODESTRING_JS,
    logoProps: {
        pwm: HEX_PWM(),
        alphabet: HEX_ALPHABET
    },
    description: "A logo can use any combination of upper case letters, lower case letters, and digits.",
    header: "Custom symbols",
    longDescription: HEX_LONG_DESCRIPTION
};

const DUPLICATE_PWM = [
    [ 1, 0, 0, 0, 0, 0 ],
    [ 0, 1, 0, 0, 0, 0 ],
    [ 0, 0, 1, 0, 0, 0 ],
    [ 0, 0, 0, 1, 0, 0 ],
    [ 0, 0, 0, 0, 1, 0 ],
    [ 0, 0, 0, 0, 0, 1 ]
];

const DUPLICATE_ALPHABET = [
    { regex: "A", component: CompleteAlphabet[0].component, color: "#ff0000" },
    { regex: "A", component: CompleteAlphabet[0].component, color: "#ffa500" },
    { regex: "A", component: CompleteAlphabet[0].component, color: "#ffcc00" },
    { regex: "A", component: CompleteAlphabet[0].component, color: "#008800" },
    { regex: "A", component: CompleteAlphabet[0].component, color: "#0000aa" },
    { regex: "A", component: CompleteAlphabet[0].component, color: "#aa00aa" }
];

const DUPLICATE_CONSTANTS = `
const CUSTOM_PWM = ${formatPWM(DUPLICATE_PWM)};
const CUSTOM_ALPHABET = ${formatAlphabet(DUPLICATE_ALPHABET)};
`.substring(1);

export const DUPLICATE_CODESTRING_JS = jsCodestring(`
${DUPLICATE_CONSTANTS}
logosj.embedLogo(document.getElementById("logo"), {
  pwm: CUSTOM_PWM,
  alphabet: CUSTOM_ALPHABET
});
`);

export const DUPLICATE_CODESTRING_REACT = `
import { Logo } from 'logosj-react';
${DUPLICATE_CONSTANTS}
export const MyRNALogo = props => (
    <Logo pwm={CUSTOM_PWM} alphabet={CUSTOM_ALPHABET} />
);
`.substring(1);

export const DUPLICATE_LONG_DESCRIPTION = `
If you need to, you can repeat the same symbol multiple times with different colors. This might be
useful if, for example, you want to render some portion of your sequence with a darker color scheme
or gray it out to emphasize a region of lesser or different biological importance. In the code, the
order of the columns in the matrix corresponds to the order of the colors in the custom alphabet array.
`;

export const DUPLICATE_DEMO = {
    reactCodestring: DUPLICATE_CODESTRING_REACT,
    jsCodestring: DUPLICATE_CODESTRING_JS,
    logoProps: {
        pwm: DUPLICATE_PWM,
        alphabet: DUPLICATE_ALPHABET
    },
    description: "A logo can use the same symbol more than once with different colors.",
    header: "Repeated symbols",
    longDescription: DUPLICATE_LONG_DESCRIPTION
};
