import React from 'react';

import { downloadSVG } from './utils';

const _dodownload = ( svgref, filename ) => {
    downloadSVG(svgref, filename);
};

const SVGDownloadButton = ({ children, getsvgref, filename }) => (
    <span onClick={ () => _dodownload(getsvgref(), filename) }>
      {children}
    </span>
);
export default SVGDownloadButton;
