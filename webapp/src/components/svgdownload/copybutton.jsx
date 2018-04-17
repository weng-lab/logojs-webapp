import React from 'react';
import ReactDOM from 'react-dom';

import { copySVG } from './utils';

const _docopy = ( svgref ) => {
    const svgroot = ReactDOM.findDOMNode(svgref).getElementsByTagName('svg')[0];
    if (!svgroot) { return; }
    copySVG(svgroot);
};

const SVGCopyButton = ({ children, svgref }) => (
    <a onClick={ () => _docopy(svgref) }>
      {children}
    </a>
);
export default SVGCopyButton;
