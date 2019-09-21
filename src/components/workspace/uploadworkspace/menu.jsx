import React from 'react';

import { LogoMenu, LogoSVGDownloadButton, EmbedButton,
	 LogoSVGCopyButton, PermalinkButton } from '../menu/index';
import { jsCodestring } from '../../../common/codestrings';

const ITEMSTYLE = {
    logosize: "16pt",
    labelsize: "10pt",
};

const reactCode = logoinfo => `
import { Logo, loadGlyphComponents } from 'logosj-react';
const myLogoProps = {
    startpos: ${logoinfo.startpos},
    ppm: [
${logoinfo.ppm.map(x => "        " + JSON.stringify(x)).join(",\n")}
    ],
    backgroundFrequencies: ${JSON.stringify(logoinfo.backgroundFrequencies)},
    alphabet: loadGlyphComponents([
${logoinfo.alphabet.map(x => "        " + JSON.stringify({ regex: x.regex, color: x.color })).join(",\n")}
    ])
};

export const MyLogo = props => (
    <Logo {...myLogoProps} {...props} />;
);
`.substring(1); // trim leading line break

const jsCode = logoinfo => jsCodestring(`
window.onload = function() {
  const logoProps = {
    startpos: ${logoinfo.startpos},
    ppm: [
${logoinfo.ppm.map(x => "      " + JSON.stringify(x)).join(",\n")}
    ],
    backgroundFrequencies: ${JSON.stringify(logoinfo.backgroundFrequencies)},
    alphabet: logosj.loadGlyphComponents([
${logoinfo.alphabet.map(x => "      " + JSON.stringify({ regex: x.regex, color: x.color })).join(",\n")}
    ])
  };
  logosj.embedLogo(document.getElementById("logo"), logoProps);
}
`);

const UploadLogoMenu = ({ svgref, apiurl, logoinfo }) => (
    <LogoMenu width="100%">
      <LogoSVGDownloadButton {...ITEMSTYLE}
			     labeltext="save" svgref={svgref.current}
			     filename="logo.svg" />
      <LogoSVGCopyButton {...ITEMSTYLE}
			 labeltext="copy SVG code" svgref={svgref.current} />
      <PermalinkButton {...ITEMSTYLE} labeltext="permalink"
		       url={apiurl} logoinfo={logoinfo} />
      <EmbedButton {...ITEMSTYLE} labeltext="embed" js={jsCode(logoinfo)}
                   url={apiurl} react={reactCode(logoinfo)} />
    </LogoMenu>
);
export default UploadLogoMenu;
