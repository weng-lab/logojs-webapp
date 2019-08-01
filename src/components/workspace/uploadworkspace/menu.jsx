import React from 'react';

import { LogoMenu, LogoSVGDownloadButton, EmbedButton,
	 LogoSVGCopyButton, PermalinkButton } from '../menu/index';

const ITEMSTYLE = {
    logosize: "16pt",
    labelsize: "10pt",
};

const UploadLogoMenu = ({ getsvgref, logoinfo }) => (
    <LogoMenu width="100%">
      <LogoSVGDownloadButton {...ITEMSTYLE}
			     labeltext="Save" getsvgref={getsvgref}
			     filename="logo.svg" />
      <LogoSVGCopyButton {...ITEMSTYLE}
            labeltext="Copy SVG" getsvgref={getsvgref} />
      <PermalinkButton {...ITEMSTYLE} labeltext="permalink"
		    logoinfo={logoinfo} />
      <EmbedButton {...ITEMSTYLE} labeltext="embed"
		    logoinfo={logoinfo} getsvgref={getsvgref} />
    </LogoMenu>
);
export default UploadLogoMenu;
