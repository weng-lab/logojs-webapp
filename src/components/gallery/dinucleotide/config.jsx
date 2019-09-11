import { jsCodestring, formatPWM, formatAlphabet } from '../../../common/codestrings';
import { DINUCLEOTIDE_PWM, DINUCLEOTIDE_ALPHABET, TRINUCLEOTIDE_ALPHABET,
         TRINUCLEOTIDE_PWM, MULTINUMBER_ALPHABET } from '../constants';

const DINUCLEOTIDE_CONSTANTS = `
const DINUCLEOTIDE_PWM = ${formatPWM(DINUCLEOTIDE_PWM)};
const DINUCLEOTIDE_ALPHABET = loadGlyphComponents(${formatAlphabet(DINUCLEOTIDE_ALPHABET())});
`.substring(1);

export const DINUCLEOTIDE_CODESTRING_JS = jsCodestring(`
${DINUCLEOTIDE_CONSTANTS}
logosj.embedLogo(document.getElementById("logo"), {
  pwm: DINUCLEOTIDE_PWM,
  alphabet: DINUCLEOTIDE_ALPHABET
});
`);

export const DINUCLEOTIDE_CODESTRING_REACT = `
import { Logo, loadGlyphComponents } from 'logosj-react';
${DINUCLEOTIDE_CONSTANTS}
export const DinucleotideLogo = props => (
    <Logo pwm={DINUCLEOTIDE_PWM} alphabet={DINUCLEOTIDE_ALPHABET} />
);
`.substring(1);

export const DINUCLEOTIDE_LONG_DESCRIPTION = `
Positions in a logo can be dinucleotides rather than a single nucleotide. In this example,
the individual nucleotides are colored according to the default DNA color scheme.
`;

export const DINUCLEOTIDE_DEMO = {
    reactCodestring: DINUCLEOTIDE_CODESTRING_REACT,
    jsCodestring: DINUCLEOTIDE_CODESTRING_JS,
    logoProps: {
        pwm: DINUCLEOTIDE_PWM,
        alphabet: DINUCLEOTIDE_ALPHABET()
    },
    description: "A logo can have dinucleotide symbols.",
    header: "Dinucleotide logo",
    longDescription: DINUCLEOTIDE_LONG_DESCRIPTION
};

const TRINUCLEOTIDE_CONSTANTS = `
const TRINUCLEOTIDE_PWM = ${formatPWM(TRINUCLEOTIDE_PWM)};
const TRINUCLEOTIDE_ALPHABET = loadGlyphComponents(${formatAlphabet(TRINUCLEOTIDE_ALPHABET)});
`.substring(1);

export const TRINUCLEOTIDE_CODESTRING_JS = jsCodestring(`
${TRINUCLEOTIDE_CONSTANTS}
logosj.embedLogo(document.getElementById("logo"), {
  pwm: TRINUCLEOTIDE_PWM,
  alphabet: TRINUCLEOTIDE_ALPHABET,
  glyphwidth: 1.5
});
`);

export const TRINUCLEOTIDE_CODESTRING_REACT = `
import { Logo, loadGlyphComponents } from 'logosj-react';
${TRINUCLEOTIDE_CONSTANTS}
export const TrinucleotideLogo = props => (
    <Logo pwm={TRINUCLEOTIDE_PWM} alphabet={TRINUCLEOTIDE_ALPHABET} glyphwidth={1.5} />
);
`.substring(1);

export const TRINUCLEOTIDE_LONG_DESCRIPTION = `
A logo can have arbitrary numbers of letters per position. In this example, a trinucleotide
logo is shown, but custom alphabets can extend to as many letters as desired. When showing
three or more letters per position, it may be best to increase the glyph width; this property is
built in (the positions in this logo have been scaled to 1.5x the default width in the code).
Note also that any combination of colors is possible. In this case, each trinucleotide
combination has its own single color.
`;

export const TRINUCLEOTIDE_DEMO = {
    reactCodestring: TRINUCLEOTIDE_CODESTRING_REACT,
    jsCodestring: TRINUCLEOTIDE_CODESTRING_JS,
    logoProps: {
        pwm: TRINUCLEOTIDE_PWM,
        alphabet: TRINUCLEOTIDE_ALPHABET,
        glyphwidth: 1.5
    },
    description: "A logo can render three or more symbols per position and use custom color schemes.",
    header: "Trinucleotide logo",
    longDescription: TRINUCLEOTIDE_LONG_DESCRIPTION
};

const MULTINUMBER_CONSTANTS = `
const CUSTOM_PWM = ${formatPWM(TRINUCLEOTIDE_PWM)};
const CUSTOM_ALPHABET = loadGlyphComponents(${formatAlphabet(MULTINUMBER_ALPHABET)});
`.substring(1);

export const MULTINUMBER_CODESTRING_JS = jsCodestring(`
${MULTINUMBER_CONSTANTS}
logosj.embedLogo(document.getElementById("logo"), {
  pwm: CUSTOM_PWM,
  alphabet: CUSTOM_ALPHABET,
  glyphwidth: 1.5
});
`);

export const MULTINUMBER_CODESTRING_REACT = `
import { Logo, loadGlyphComponents } from 'logosj-react';
${MULTINUMBER_CONSTANTS}
export const MyLogo = props => (
    <Logo pwm={CUSTOM_PWM} alphabet={CUSTOM_ALPHABET} glyphwidth={1.5} />
);
`.substring(1);

export const MULTINUMBER_LONG_DESCRIPTION = `
Multisymbol logos are not restricted to the DNA alphabet. You can combine any of the supported symbols
(lower case and capital letters plus the digits 0-9) in your multisymbol logos. The logo can even mix
symbols of different lengths. Here a logo using the digits 1-3 in various combinations is shown.
`;

export const MULTINUMBER_DEMO = {
    reactCodestring: MULTINUMBER_CODESTRING_REACT,
    jsCodestring: MULTINUMBER_CODESTRING_JS,
    logoProps: {
        pwm: TRINUCLEOTIDE_PWM,
        alphabet: MULTINUMBER_ALPHABET,
        glyphwidth: 1.5
    },
    description: "A logo may use any combination of supported letters and digits in multisymbol logos.",
    header: "Custom trisymbol logo",
    longDescription: MULTINUMBER_LONG_DESCRIPTION
};
