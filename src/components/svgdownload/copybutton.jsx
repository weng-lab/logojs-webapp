import React from 'react';
import copy from 'copy-to-clipboard';

import { _svgdata } from './utils';

const SVGCopyButton = ({ children, getsvgref }) => (
      <span onClick={() => copy(_svgdata(getsvgref()))}>
	{children}
      </span>
);
export default SVGCopyButton;
