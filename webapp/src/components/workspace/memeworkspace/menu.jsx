import React from 'react';

import { LogoMenu, LogoSVGDownloadButton, EmbedButton,
	 LogoSVGCopyButton, PermalinkButton } from '../menu/index';

const ITEMSTYLE = {
    logosize: "16pt",
    labelsize: "10pt",
};

const MEMELogoMenu = ({ svgref, apiurl, logoinfo }) => (
    <LogoMenu width="100%">
      <LogoSVGDownloadButton {...ITEMSTYLE}
			     labeltext="Save" svgref={svgref}
			     filename="logo.svg" />
      <LogoSVGCopyButton {...ITEMSTYLE}
			 labeltext="Copy SVG" svgref={svgref} />
      <PermalinkButton {...ITEMSTYLE} labeltext="permalink"
		       url={apiurl} logoinfo={logoinfo} />
      <EmbedButton {...ITEMSTYLE} labeltext="embed"
		   url={apiurl} logoinfo={logoinfo} />
    </LogoMenu>
);
export default MEMELogoMenu;
