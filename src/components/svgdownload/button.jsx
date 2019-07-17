import React from 'react';

import { downloadSVG } from './utils';

const _dodownload = ( svgref, filename ) => {
    downloadSVG(svgref, filename);
};

const SVGDownloadButton = ({ children, svgref, filename }) => (
    <span onClick={ () => _dodownload(svgref, filename) }>
      {children}
    </span>
);
export default SVGDownloadButton;
