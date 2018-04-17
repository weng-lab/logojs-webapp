import React from 'react';
import ReactDOM from 'react-dom';

import { downloadSVG } from './utils';

const _dodownload = ( svgref, filename ) => {
    const svgroot = ReactDOM.findDOMNode(svgref).getElementsByTagName('svg')[0];
    if (!svgroot) { return; }
    downloadSVG(svgroot, filename);
};

const SVGDownloadButton = ({ children, svgref, filename }) => (
    <a onClick={ () => _dodownload(svgref, filename) }>
      {children}
    </a>
);
export default SVGDownloadButton;
