import React from 'react';

import { LogoMenu, LogoSVGDownloadButton, EmbedButton,
	 LogoSVGCopyButton, PermalinkButton } from '../menu/index';

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

const PWMLogoMenu = ({ svgref, apiurl, logoinfo }) => (
    <LogoMenu width="100%" background="#d0d0d0">
      <LogoSVGDownloadButton {...ITEMSTYLE}
			     labeltext="save" svgref={svgref}
			     filename="logo.svg" />
      <LogoSVGCopyButton {...ITEMSTYLE}
			 labeltext="copy SVG code" svgref={svgref} />
      <PermalinkButton {...ITEMSTYLE} labeltext="permalink"
		       url={apiurl} logoinfo={logoinfo} />
      <EmbedButton {...ITEMSTYLE} labeltext="embed"
                   url={apiurl} react={reactCode(logoinfo)} logoinfo={logoinfo} />
    </LogoMenu>
);
export default PWMLogoMenu;
