import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const GalleryItem = ({ children, code }) => (
    <React.Fragment>
      {children}
      <SyntaxHighlighter language="javascript">
        {code}
      </SyntaxHighlighter>
    </React.Fragment>
);
export default GalleryItem;
