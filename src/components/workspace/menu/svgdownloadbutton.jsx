import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { SVGDownloadButton } from '../../svgdownload/index';

const LogoSVGDownloadButton = ({ getsvgref, filename, iconsize, labelsize, labeltext }) => (
    <Menu.Item link>
      <SVGDownloadButton getsvgref={getsvgref} filename={filename}>
	<Icon className="download" style={{ color: "#000", fontSize: iconsize }} /><br />
	<div style={{ fontSize: labelsize, color: "#000" }}>{labeltext}</div>
      </SVGDownloadButton>
    </Menu.Item>
);
export default LogoSVGDownloadButton;
