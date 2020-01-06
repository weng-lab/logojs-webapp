import { ProteinAlphabet, DNAAlphabet } from 'logojs-react';

import { jsCodestring, formatPPM } from '../../../common/codestrings';
import { AA_PPM, DNA_NEGATIVE_PPM, DNA_NEGATIVE_PPM2 } from '../constants';

const AA_CONSTANTS = `
const AA_PPM = ${formatPPM(AA_PPM)};
`.substring(1);

export const AA_CODESTRING_JS = jsCodestring(`
${AA_CONSTANTS}
logojs.embedLogoWithNegatives(document.getElementById("logo"), {
  values: AA_PPM,
  alphabet: logojs.ProteinAlphabet
});
`);

export const AA_CODESTRING_REACT = `
import { LogoWithNegatives, ProteinAlphabet } from 'logojs-react';
${AA_CONSTANTS}
export const ProteinLogo = props => (
    <LogoWithNegatives values={AA_PPM} alphabet={ProteinAlphabet} />
);
`.substring(1);

export const AA_LONG_DESCRIPTION = `
A logo can by rendered with both positive and negative symbol heights. Here a protein
logo with negative heights is shown. By default, negative symbols are rendered upside
down and a dashed line is drawn at the x-axis.
`;

export const AA_DEMO = {
    reactCodestring: AA_CODESTRING_REACT,
    jsCodestring: AA_CODESTRING_JS,
    logoProps: {
        values: AA_PPM,
        alphabet: ProteinAlphabet,
        protein: true
    },
    description: "A logo can render both positive and negative letter heights.",
    header: "Negative heights",
    longDescription: AA_LONG_DESCRIPTION
};

const DNA_CONSTANTS = `
const DNA_PPM = ${formatPPM(DNA_NEGATIVE_PPM)};
`.substring(1);

export const DNA_CODESTRING_JS = jsCodestring(`
${DNA_CONSTANTS}
logojs.embedLogoWithNegatives(document.getElementById("logo"), {
  values: DNA_PPM,
  alphabet: logojs.DNAAlphabet,
  negativealpha: 101
});
`);

export const DNA_CODESTRING_REACT = `
import { LogoWithNegatives, DNAAlphabet } from 'logojs-react';
${DNA_CONSTANTS}
export const DNALogo = props => (
    <LogoWithNegatives values={DNA_PPM} alphabet={DNAAlphabet} negativealpha={101} />
);
`.substring(1);

export const DNA_LONG_DESCRIPTION = `
To aid in distinguishing positive and negative letters quickly by eye, LogoJS can render
negative letters with a lighter shade. The negativealpha property ranges from 0 (completely
transparent) to 255 (same shade as positive). Here a semi-transparent value of 101 is used.
`;

export const DNA_DEMO = {
    reactCodestring: DNA_CODESTRING_REACT,
    jsCodestring: DNA_CODESTRING_JS,
    logoProps: {
        values: DNA_NEGATIVE_PPM,
        alphabet: DNAAlphabet,
        negativealpha: 101
    },
    description: "A logo can render its negative letters in a lighter shade.",
    header: "Semitransparent negatives",
    longDescription: DNA_LONG_DESCRIPTION
};

const DNA_CONSTANTS2 = `
const DNA_PPM = ${formatPPM(DNA_NEGATIVE_PPM2)};
`.substring(1);

export const DNA_CODESTRING_JS2 = jsCodestring(`
${DNA_CONSTANTS2}
logojs.embedLogoWithNegatives(document.getElementById("logo"), {
  values: DNA_PPM,
  alphabet: logojs.DNAAlphabet,
  negativealpha: 101,
  inverted: true
});
`);

export const DNA_CODESTRING_REACT2 = `
import { LogoWithNegatives, DNAAlphabet } from 'logojs-react';
${DNA_CONSTANTS2}
export const DNALogo = props => (
    <LogoWithNegatives values={DNA_PPM} alphabet={DNAAlphabet} negativealpha={101} inverted />
);
`.substring(1);

export const DNA_LONG_DESCRIPTION2 = `
LogoJS can render negative letters right side up instead of upside down if that
makes the logo easier to read.
`;

export const DNA_DEMO2 = {
    reactCodestring: DNA_CODESTRING_REACT2,
    jsCodestring: DNA_CODESTRING_JS2,
    logoProps: {
        values: DNA_NEGATIVE_PPM2,
        alphabet: DNAAlphabet,
        negativealpha: 101,
        inverted: true
    },
    description: "A logo can render negative letters right side up.",
    header: "Negatives right side up",
    longDescription: DNA_LONG_DESCRIPTION2
};
