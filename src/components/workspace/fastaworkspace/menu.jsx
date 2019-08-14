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
    startpos: ${logoinfo.firstbase},
    pwm: [
${logoinfo.pwm.map(x => "        " + JSON.stringify(x)).join(",\n")}
    ],
    glyphmap: loadGlyphComponents([
${logoinfo.glyphmap.map(x => "        " + JSON.stringify({ regex: x.regex, color: x.color })).join(",\n")}
    ])
};

export const MyLogo = props => (
    <Logo {...myLogoProps} {...props} />;
);
`.substring(1); // trim leading line break

const jsCode = logoinfo => jsCodestring(`
window.onload = function() {
  const logoProps = {
    startpos: ${logoinfo.firstbase},
    pwm: [
${logoinfo.pwm.map(x => "      " + JSON.stringify(x)).join(",\n")}
    ],
    glyphmap: logosj.loadGlyphComponents([
${logoinfo.glyphmap.map(x => "      " + JSON.stringify({ regex: x.regex, color: x.color })).join(",\n")}
    ])
  };
  logosj.embedLogo(document.getElementById("logo"), logoProps);
}
`);

const FastaLogoMenu = ({ svgref, apiurl, logoinfo }) => (
    <LogoMenu width="100%" background="#d0d0d0">
      <LogoSVGDownloadButton {...ITEMSTYLE}
			     labeltext="save" svgref={svgref}
			     filename="logo.svg" />
      <LogoSVGCopyButton {...ITEMSTYLE}
			 labeltext="copy SVG code" svgref={svgref} />
      <PermalinkButton {...ITEMSTYLE} labeltext="permalink"
		       url={apiurl} logoinfo={logoinfo} />
      <EmbedButton {...ITEMSTYLE} labeltext="embed" js={jsCode(logoinfo)}
                   url={apiurl} react={reactCode(logoinfo)} logoinfo={logoinfo} />
    </LogoMenu>
);
export default FastaLogoMenu;
