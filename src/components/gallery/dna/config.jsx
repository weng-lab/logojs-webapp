import React from 'react';
import { CompleteAlphabet, DNAAlphabet } from 'logojs-react';

import SyntaxHighlighter from '../syntax';
import { INTRON_PPM, CAP_PPM, CTCF_PPM } from '../constants';
import { jsCodestring, formatPPM } from '../../../common/codestrings';
import { indentCode } from '../../../common/utils';

const CAP_PPM_CODE = `
const CAP_PPM = ${formatPPM(CAP_PPM)};
`.substring(1);

export const CAP_CODESTRING_JS = jsCodestring(`
${CAP_PPM_CODE}
logojs.embedDNALogo(document.getElementById("logo"), { ppm: CAP_PPM });
`);

export const CAP_CODESTRING_REACT = `
import { DNALogo } from 'logojs-react';
${CAP_PPM_CODE}
export const CAPLogo = props => (
    <DNALogo ppm={CAP_PPM} />
);
`;

const CTCF_PPM_CODE = `
const CTCF_PPM = ${formatPPM(CTCF_PPM)};
`;

export const CTCF_CODESTRING_REACT = `
import { DNALogo } from 'logojs-react';
${CTCF_PPM_CODE}
export const CTCFLogo = props => (
    <DNALogo ppm={CTCF_PPM} mode="FREQUENCY" />
);
`;

export const CTCF_CODESTRING_JS = jsCodestring(`
${CTCF_PPM_CODE}
logojs.embedDNALogo(document.getElementById("logo"), { ppm: CTCF_PPM, mode: "FREQUENCY" });
`);

const INTRON_PPM_CODE = `
const INTRON_PPM = ${formatPPM(INTRON_PPM)};
`;

export const INTRON_CODESTRING_REACT = `
import { DNALogo } from 'logojs-react';
${INTRON_PPM_CODE}
export const IntronLogo = props => (
    <DNALogo ppm={INTRON_PPM} startpos={-18} />
);
`;

export const INTRON_CODESTRING_JS = jsCodestring(`
${INTRON_PPM_CODE}
logojs.embedDNALogo(document.getElementById("logo"), { ppm: INTRON_PPM, startpos: -18 });
`);

export const LOWERCASE_CONSTANTS = `
const LOWERCASE_PPM = [
  [0.09, 0.31, 0.08, 0.50], [0.18, 0.15, 0.45, 0.20], [0.30, 0.05, 0.49, 0.14],
  [0.06, 0.87, 0.02, 0.03], [0.00, 0.98, 0.00, 0.02], [0.81, 0.01, 0.07, 0.09], 
  [0.04, 0.57, 0.36, 0.01], [0.11, 0.47, 0.05, 0.35], [0.93, 0.01, 0.03, 0.01],
  [0.00, 0.00, 0.99, 0.01], [0.36, 0.00, 0.64, 0.00], [0.05, 0.01, 0.55, 0.37], 
  [0.03, 0.00, 0.97, 0.00], [0.06, 0.00, 0.85, 0.07], [0.11, 0.80, 0.00, 0.07],
  [0.40, 0.01, 0.55, 0.01], [0.09, 0.53, 0.33, 0.04], [0.12, 0.35, 0.08, 0.43], 
  [0.44, 0.19, 0.29, 0.06]
];
const LOWERCASE_ALPHABET = [
    { color: "#880000", regex: "a" },
    { color: "#008800", regex: "c" },
    { color: "#000088", regex: "g" },
    { color: "#880088", regex: "t" }
];
`;

export const LOWERCASE_CODESTRING_REACT = `
import { Logo } from 'logojs-react';
${LOWERCASE_CONSTANTS}
export const LowercaseLogo = props => (
    <Logo alphabet={LOWERCASE_ALPHABET} ppm={LOWERCASE_PPM} />
);
`;

export const LOWERCASE_CODESTRING_JS = jsCodestring(`
${LOWERCASE_CONSTANTS}
logojs.embedLogo(document.getElementById("logo"), {
  ppm: LOWERCASE_PPM,
  alphabet: LOWERCASE_ALPHABET
});
`);

export const CAP_LONG_DESCRIPTION = `
This logo shows the consensus DNA binding motif for catabolite activating protein (CAP).
By default, a DNA logo scales its letters using information content, such that the most
important bases in the logo appear the most important. When rendering the logo, the columns
in the matrix are ordered alphabetically (A, C, G, T).
`;

export const CTCF_LONG_DESCRIPTION = `
This logo shows the consensus DNA binding motif for CTCF. Here, the letter heights are
determined by the frequency of each nucleotide at each position rather than by information
content.
`;

export const INTRON_LONG_DESCRIPTION = `
This logo shows an intron-exon splice boundary. Base number 0 is the first base in the exon,
with bases in the preceding intron labeled -18 to -1.
`;

export const LOWERCASE_LONG_DESCRIPTION = `
This logo shows the consensus DNA binding motif for CTCF, but uses lower case letters and a
custom color scheme.
`;

export const INFORMATION_CONTENT_DEMO = {
    reactCodestring: CAP_CODESTRING_REACT,
    jsCodestring: CAP_CODESTRING_JS,
    logoProps: {
        ppm: CAP_PPM
    },
    description: "A DNA logo can use information content to scale its letters.",
    header: "Information Content",
    longDescription: CAP_LONG_DESCRIPTION
};

export const FREQUENCY_DEMO = {
    reactCodestring: CTCF_CODESTRING_REACT,
    jsCodestring: CTCF_CODESTRING_JS,
    logoProps: {
        ppm: CTCF_PPM,
        mode: "FREQUENCY"
    },
    description: "A DNA logo can use frequency to scale its letters.",
    header: "Frequency",
    longDescription: CTCF_LONG_DESCRIPTION
};

export const STARTPOS_DEMO = {
    reactCodestring: INTRON_CODESTRING_REACT,
    jsCodestring: INTRON_CODESTRING_JS,
    logoProps: {
        ppm: INTRON_PPM,
        startpos: -18
    },
    description: "A DNA logo can use a custom number for the first base.",
    header: "Custom starting base",
    longDescription: INTRON_LONG_DESCRIPTION
};

const NOAXIS_LONG_DESCRIPTION = `
This logo shows the consensus DNA binding motif for CTCF, rendered without an x-axis
or y-axis.
`;

const NOAXIS_CONSTANTS = `
const PPM = [
  [0.09, 0.31, 0.08, 0.50], [0.18, 0.15, 0.45, 0.20], [0.30, 0.05, 0.49, 0.14],
  [0.06, 0.87, 0.02, 0.03], [0.00, 0.98, 0.00, 0.02], [0.81, 0.01, 0.07, 0.09], 
  [0.04, 0.57, 0.36, 0.01], [0.11, 0.47, 0.05, 0.35], [0.93, 0.01, 0.03, 0.01],
  [0.00, 0.00, 0.99, 0.01], [0.36, 0.00, 0.64, 0.00], [0.05, 0.01, 0.55, 0.37], 
  [0.03, 0.00, 0.97, 0.00], [0.06, 0.00, 0.85, 0.07], [0.11, 0.80, 0.00, 0.07],
  [0.40, 0.01, 0.55, 0.01], [0.09, 0.53, 0.33, 0.04], [0.12, 0.35, 0.08, 0.43], 
  [0.44, 0.19, 0.29, 0.06]
];
`;

export const NOAXIS_CODESTRING_REACT = `
import { RawLogo, DNAAlphabet } from 'logojs-react';
${NOAXIS_CONSTANTS}
export const NoAxisLogo = props => (
  <svg viewBox="0 0 1900 100">
    <RawLogo alphabet={DNAAlphabet} values={PPM} glyphWidth={100} stackHeight={100} />
  </svg>
);
`;

const NOAXIS_JS = `
${NOAXIS_CONSTANTS}
logojs.embedRawLogo(document.getElementById("logo"), {
  values: PPM,
  alphabet: logojs.DNAAlphabet,
  glyphWidth: 100,
  stackHeight: 100
});
`;

export const NOAXIS_CODESTRING_JS = `
<!doctype html>
<html>
  <body>
    <script src="http://bundle.logojs.wenglab.org/bundle.js" type="text/javascript"></script>
    <div style="width:500px">
      <svg viewBox="0 0 1900 100">
        <g id="logo"></g>
      </svg>
    </div>
    <script type="text/javascript">
${indentCode(NOAXIS_JS, "      ")}
    </script>
  </body>
</html>
`.substring(1);

export const NOAXIS_DEMO = {
    reactCodestring: NOAXIS_CODESTRING_REACT,
    jsCodestring: NOAXIS_CODESTRING_JS,
    logoProps: {
        values: CTCF_PPM,
        alphabet: DNAAlphabet,
        raw: true,
        glyphWidth: 100,
        stackHeight: 100
    },
    description: "A DNA logo can be rendered without axes or labels.",
    header: "Without axes and labels",
    longDescription: NOAXIS_LONG_DESCRIPTION
};

const LOWERCASE_ALPHABET = [
    { color: "#880000", component: CompleteAlphabet[26].component, regex: "a" },
    { color: "#008800", component: CompleteAlphabet[28].component, regex: "c" },
    { color: "#000088", component: CompleteAlphabet[32].component, regex: "g" },
    { color: "#880088", component: CompleteAlphabet[45].component, regex: "t" }
];

export const LOWERCASE_DEMO = {
    reactCodestring: LOWERCASE_CODESTRING_REACT,
    jsCodestring: LOWERCASE_CODESTRING_JS,
    logoProps: {
        ppm: CTCF_PPM,
        alphabet: LOWERCASE_ALPHABET,
        custom: true
    },
    description: "A DNA logo can use lowercase letters and custom colors.",
    header: "Custom letters and colors",
    longDescription: LOWERCASE_LONG_DESCRIPTION
};

export const CAPExample = props => (
    <SyntaxHighlighter language="jsx">
      {CAP_CODESTRING_REACT}
    </SyntaxHighlighter>
);
