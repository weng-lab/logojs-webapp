import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { SVGCopyButton } from '../../svgdownload/index';

const LogoSVGCopyButton = ({ svgref, iconsize, labelsize, labeltext }) => (
    <Menu.Item link>
      <SVGCopyButton svgref={svgref}>
	<Icon className="code" style={{ color: "#000", fontSize: iconsize }} /><br />
	<div style={{ fontSize: labelsize, color: "#000" }}>{labeltext}</div>
      </SVGCopyButton>
    </Menu.Item>
);
export default LogoSVGCopyButton;
