import React from 'react';

import { downloadSVG } from './utils';

const SVGDownloadButton = ({ children, svgref, filename }) => (
    <span onClick={ () => downloadSVG(svgref, filename) }>
      {children}
    </span>
);
export default SVGDownloadButton;
