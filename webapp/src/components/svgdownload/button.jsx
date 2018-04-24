import React from 'react';

import { downloadSVG } from './utils';

const _dodownload = ( svgref, filename ) => {
    downloadSVG(svgref, filename);
};

const SVGDownloadButton = ({ children, svgref, filename }) => (
    <a onClick={ () => _dodownload(svgref, filename) }>
      {children}
    </a>
);
export default SVGDownloadButton;
