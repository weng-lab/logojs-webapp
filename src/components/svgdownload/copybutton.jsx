import React from 'react';
import ReactDOM from 'react-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { _svgdata } from './utils';

const SVGCopyButton = ({ children, svgref }) => (
    <CopyToClipboard text={_svgdata(ReactDOM.findDOMNode(svgref))}>
      <a>
	{children}
      </a>
    </CopyToClipboard>
);
export default SVGCopyButton;
