import React from 'react';
import { LogoMenu, LogoSVGDownloadButton, LogoSVGCopyButton } from '../menu/index';

const ITEMSTYLE = {
    logosize: "16pt",
    labelsize: "10pt",
};

const FastaLogoMenu = ({ svgref }) => (
    <LogoMenu width="100%" background="#d0d0d0">
      <LogoSVGDownloadButton {...ITEMSTYLE}
			     labeltext="Save" svgref={svgref}
			     filename="logo.svg" />
      <LogoSVGCopyButton {...ITEMSTYLE}
			 labeltext="Copy SVG" svgref={svgref} />
    </LogoMenu>
);
export default FastaLogoMenu;
