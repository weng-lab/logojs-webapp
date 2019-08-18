import React from 'react';
import { RawLogo, DNAGlyphmap, ProteinGlyphmap } from 'logos-to-go-react';

import { formatPWM, formatGlyphmap } from '../../../common/codestrings';
import { indentCode } from '../../../common/utils';
import { ANNOTATED_PWM, ANNOTATED_GLYPHMAP, SNP_PWM,
         SNP_REF_PWM, DNA_PROTEIN_PWM,
         PROTEIN_DNA_PWM } from '../constants';

const ANNOTATED_CONSTANTS = `
const ANNOTATED_PWM = ${formatPWM(ANNOTATED_PWM)};
const ANNOTATED_GLYPHMAP = ${formatGlyphmap(ANNOTATED_GLYPHMAP)};
`.substring(1);

export const ANNOTATED_JS = `
${ANNOTATED_CONSTANTS}
logosj.embedRawLogo(document.getElementById("logo"), {
  pwm: ANNOTATED_PWM,
  glyphmap: ANNOTATED_GLYPHMAP,
  glyphWidth: 100,
  stackHeight: 300
});
`;

export const ANNOTATED_CODESTRING_JS = `
<!doctype html>
<html>
  <body>
    <script src="https://package.logosj.wenglab.org/bundle.js" type="text/javascript"></script>
    <div style="width:500px">
      <svg viewBox="0 0 1530 330">
        <g transform="translate(20,-40)" id="logo"></g>
        <rect fill="none" stroke="#888888" strokeWidth="25" x={15} y={10} width={600} height={300} />
        <rect fill="none" stroke="#888888" strokeWidth="25" x={915} width={600} y={10} height={300} />
      </svg>
    </div>
    <script type="text/javascript">
${indentCode(ANNOTATED_JS, "      ")}
    </script>
  </body>
</html>
`.substring(1);

export const ANNOTATED_CODESTRING_REACT = `
import { RawLogo } from 'logosj-react';
${ANNOTATED_CONSTANTS}
export const AnnotatedLogo = props => (
  <svg viewBox="0 0 1530 330">
    <g transform="translate(20,-40)" id="logo">
      <RawLogo pwm={ANNOTATED_PWM} glyphmap={ANNOTATED_GLYPHMAP} glyphWidth={100} stackHeight={300} />
    </g>
    <rect fill="none" stroke="#888888" strokeWidth="25" x={15} y={10} width={600} height={300} />
    <rect fill="none" stroke="#888888" strokeWidth="25" x={915} width={600} y={10} height={300} />
  </svg>
);
`.substring(1);

export const ANNOTATED_LONG_DESCRIPTION = `
If you want to draw attention to important portions of a logo, you can use SVG components to highlight them.
In this example, two important regions are boxed and colored while a less important central region is gray.
In the code, this is achieved by rendering a RawLogo within an SVG, then adding rect elements with the
appropriate coordinates. The gray letters are separate symbols in a custom alphabet.
`;

export const ANNOTATED_DEMO = {
    reactCodestring: ANNOTATED_CODESTRING_REACT,
    jsCodestring: ANNOTATED_CODESTRING_JS,
    component: (
        <svg viewBox="0 0 1530 330">
          <g transform="translate(20,-40)" id="logo">
            <RawLogo pwm={ANNOTATED_PWM} glyphmap={ANNOTATED_GLYPHMAP} glyphWidth={100} stackHeight={300} />
          </g>
          <rect fill="none" stroke="#888888" strokeWidth="25" x={15} y={10} width={600} height={300} />
          <rect fill="none" stroke="#888888" strokeWidth="25" x={915} width={600} y={10} height={300} />
        </svg>
    ),
    description: "A logo can use SVG components to highlight important regions.",
    header: "Highlighting regions",
    longDescription: ANNOTATED_LONG_DESCRIPTION
};

const SNP_CONSTANTS = `
const SNP_PWM = ${formatPWM(SNP_PWM)};
const REFERENCE_PWM = ${formatPWM(SNP_REF_PWM)};
`.substring(1);

export const SNP_JS = `
${SNP_CONSTANTS}
logosj.embedRawLogo(document.getElementById("motiflogo"), {
  pwm: SNP_PWM,
  glyphmap: logosj.DNAGlyphmap,
  glyphWidth: 100,
  stackHeight: 200
});
logosj.embedRawLogo(document.getElementById("reflogo"), {
  pwm: REFERENCE_PWM,
  glyphmap: logosj.DNAGlyphmap,
  glyphWidth: 100,
  stackHeight: 200
});
`;

export const SNP_CODESTRING_JS = `
<!doctype html>
<html>
  <body>
    <script src="https://package.logosj.wenglab.org/bundle.js" type="text/javascript"></script>
    <div style="width:500px">
      <svg viewBox="0 0 1100 420"}>
        <rect x={600} width={100} height={420} fill="#bbbbbb" />
        <g transform="translate(300,0)" id="motiflogo"></g>
        <g transform="translate(300, 220)" id="reflogo"></g>
        <text y={150} x={260} textAnchor="end" style={{ fontSize: "50px" }}>PWM</text>
        <text y={350} x={260} textAnchor="end" style={{ fontSize: "50px" }}>reference</text>
      </svg>
    </div>
    <script type="text/javascript">
${indentCode(SNP_JS, "      ")}
    </script>
  </body>
</html>
`.substring(1);

export const SNP_CODESTRING_REACT = `
import { RawLogo, DNAGlyphmap } from 'logosj-react';
${SNP_CONSTANTS}
export const SNPLogo = props => (
  <svg viewBox="0 0 1100 420">
    <rect x={600} width={100} height={420} fill="#bbbbbb" />
    <g transform="translate(300,0)">
      <RawLogo glyphmap={DNAGlyphmap} pwm={SNP_PWM} glyphWidth={100} stackHeight={200} />
    </g>
    <g transform="translate(300, 220)">
      <RawLogo glyphmap={DNAGlyphmap} pwm={REFERENCE_PWM} glyphWidth={100} stackHeight={200} />
    </g>
    <text y={150} x={260} textAnchor="end" style={{ fontSize: "50px" }}>PWM</text>
    <text y={350} x={260} textAnchor="end" style={{ fontSize: "50px" }}>reference</text>
  </svg>
);
`.substring(1);

const SNP_LONG_DESCRIPTION = `
By layering two DNA logos on top of each other with the appropriate SVG annotations, you can highlight
a SNP interrupting a motif. Here, a binding motif (top) differs from the reference sequence (bottom) by
a T/C substitution at the fourth position. In the code, this is achieved by rendering two RawLogos at the
appropriate coordinates and adding rect and text elements to annotate them.
`;

export const SNP_DEMO = {
    reactCodestring: SNP_CODESTRING_REACT,
    jsCodestring: SNP_CODESTRING_JS,
    component: (
        <svg viewBox={"0 0 " + (SNP_PWM.length * 100 + 300) + " 420"}>
          <rect x={600} width={100} height={420} fill="#bbbbbb" />
          <g transform="translate(300,0)">
            <RawLogo glyphmap={DNAGlyphmap} pwm={SNP_PWM} glyphWidth={100} stackHeight={200} />
          </g>
          <g transform="translate(300, 220)">
            <RawLogo glyphmap={DNAGlyphmap} pwm={SNP_REF_PWM} glyphWidth={100} stackHeight={200} />
          </g>
          <text y={150} x={260} textAnchor="end" style={{ fontSize: "50px" }}>PWM</text>
          <text y={350} x={260} textAnchor="end" style={{ fontSize: "50px" }}>reference</text>
        </svg>
    ),
    description: "A logo can use SVG components to highlight a variant.",
    header: "Variant annotation",
    longDescription: SNP_LONG_DESCRIPTION
};

const INTERACTION_CONSTANTS = `
const DNA_PROTEIN_PWM = ${formatPWM(DNA_PROTEIN_PWM)};
const PROTEIN_DNA_PWM = ${formatPWM(PROTEIN_DNA_PWM)};
`.substring(1);

export const INTERACTION_JS = `
${INTERACTION_CONSTANTS}
logosj.embedRawLogo(document.getElementById("dnalogo"), {
  pwm: DNA_PROTEIN_PWM,
  glyphmap: logosj.DNAGlyphmap,
  glyphWidth: 100,
  stackHeight: 200
});
logosj.embedRawLogo(document.getElementById("proteinlogo"), {
  pwm: PROTEIN_DNA_PWM,
  glyphmap: logosj.ProteinGlyphmap,
  glyphWidth: 100,
  stackHeight: 400
});
`;

export const INTERACTION_CODESTRING_JS = `
<!doctype html>
<html>
  <body>
    <script src="https://package.logosj.wenglab.org/bundle.js" type="text/javascript"></script>
    <div style="width:500px">
      <svg viewBox="0 0 2600 920">
        <g id="dnalogo"></g>
        <g transform="translate(0,500)" id="proteinlogo"></g>
        <path fill="#88888888" d="M 1530 220 L 1600 590 L 1700 590 L 1630 220 L 1530 220" />
        <path fill="#88888888" d="M 1670 220 L 1200 520 L 1300 520 L 1750 220 L 1670 220" />
        <path fill="#88888888" d="M 1750 220 L 1100 520 L 1200 520 L 1800 220 L 1750 220" />
      </svg>
    </div>
    <script type="text/javascript">
${indentCode(INTERACTION_JS, "      ")}
    </script>
  </body>
</html>
`.substring(1);

export const INTERACTION_CODESTRING_REACT = `
import { RawLogo, DNAGlyphmap, ProteinGlyphmap } from 'logosj-react';
${INTERACTION_CONSTANTS}
export const SNPLogo = props => (
  <svg viewBox={"0 0 2600 920"}>
    <RawLogo glyphmap={DNAGlyphmap} pwm={DNA_PROTEIN_PWM} glyphWidth={100} stackHeight={200} />
    <g transform="translate(0,500)">
      <RawLogo glyphmap={ProteinGlyphmap} pwm={PROTEIN_DNA_PWM} glyphWidth={100} stackHeight={400} />
    </g>
    <path fill="#88888888" d="M 1530 220 L 1600 590 L 1700 590 L 1630 220 L 1530 220" />
    <path fill="#88888888" d="M 1670 220 L 1200 520 L 1300 520 L 1750 220 L 1670 220" />
    <path fill="#88888888" d="M 1750 220 L 1100 520 L 1200 520 L 1800 220 L 1750 220" />
  </svg>
);
`.substring(1);

const INTERACTION_LONG_DESCRIPTION = `
This example illustrates the interaction between the catabolite activator (CAP)
protein and its DNA binding sequence. In the code, this is achieved by drawing three semitransparent
SVG paths between two adjacent RawLogos, with each path representing a the interaction of an amino acid
with a pair of nucleotides.
`;

export const INTERACTION_DEMO = {
    reactCodestring: INTERACTION_CODESTRING_REACT,
    jsCodestring: INTERACTION_CODESTRING_JS,
    component: (
        <svg viewBox={"0 0 2600 920"}>
          <RawLogo glyphmap={DNAGlyphmap} pwm={DNA_PROTEIN_PWM} glyphWidth={100} stackHeight={200} />
          <g transform="translate(0,500)">
            <RawLogo glyphmap={ProteinGlyphmap} pwm={PROTEIN_DNA_PWM} glyphWidth={100} stackHeight={400} />
          </g>
          <path fill="#88888888" d="M 1530 220 L 1600 590 L 1700 590 L 1630 220 L 1530 220" />
          <path fill="#88888888" d="M 1670 220 L 1200 520 L 1300 520 L 1750 220 L 1670 220" />
          <path fill="#88888888" d="M 1750 220 L 1100 520 L 1200 520 L 1800 220 L 1750 220" />
        </svg>
    ),
    description: "A logo can use SVG components to illustrate DNA/protein interactions.",
    header: "DNA/protein interactions",
    longDescription: INTERACTION_LONG_DESCRIPTION
};
