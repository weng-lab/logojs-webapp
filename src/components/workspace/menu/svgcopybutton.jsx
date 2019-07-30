import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { SVGCopyButton } from '../../svgdownload/index';

const LogoSVGCopyButton = ({ getsvgref, iconsize, labelsize, labeltext }) => (
    <Menu.Item link>
      <SVGCopyButton getsvgref={getsvgref}>
	<Icon className="copy outline" style={{ color: "#000", fontSize: iconsize }} /><br />
	<div style={{ fontSize: labelsize, color: "#000" }}>{labeltext}</div>
      </SVGCopyButton>
    </Menu.Item>
);
export default LogoSVGCopyButton;
