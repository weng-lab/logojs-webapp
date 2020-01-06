import React from 'react';

import DNAPreview from './dnapreview';
import ProteinPreview from './proteindemo';
import ExtendedAlphabet from './extendedalphabet';
import DinucleotidePreview from './dinucleotidedemo';
import NegativesPreview from './negativesdemo';
import AnnotatedPreview from './annotateddemo';
import GalleryPageW from './page';

const GalleryPage = ({ children }) => (
    <GalleryPageW>
      <p style={{ fontSize: "1.5em" }}>
        This gallery illustrates several common and advanced use cases
        for LogoJS, along with code samples. Click the <strong>see more</strong>&nbsp;
        buttons to see how to adjust a particular logo and embed it in your site.<br /><br />
        LogoJS can accommodate use cases beyond the ones shown here.
        Full documentation is available at our&nbsp;
        <a href="https://www.github.com/weng-lab/logojs-package">GitHub</a>.<br /><br />
      </p>
      <DNAPreview />
      <ProteinPreview />
      <ExtendedAlphabet />
      <DinucleotidePreview />
      <NegativesPreview />
      <AnnotatedPreview />
    </GalleryPageW>
);
export default GalleryPage;
