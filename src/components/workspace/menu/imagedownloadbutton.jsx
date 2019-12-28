import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { ImageConverter } from '../../svgdownload/index';

const ImageDownloadButton = ({ svgref, filename, iconsize, labelsize, labeltext }) => (
    <Menu.Item link>
    { svgref && (
      <ImageConverter svgref={svgref} filename={filename}>
	<Icon className="image" style={{ color: "#000", fontSize: iconsize }} /><br />
	<div style={{ fontSize: labelsize, color: "#000" }}>{labeltext}</div>
      </ImageConverter>
      )}
    </Menu.Item>
);
export default ImageDownloadButton;
