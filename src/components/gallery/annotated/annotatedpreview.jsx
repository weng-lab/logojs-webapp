import React from 'react';

import GalleryPageW from '../page';
import DemoPanel from './demopanel';

import { ANNOTATED_DEMO, SNP_DEMO, INTERACTION_DEMO } from './config';

const AnnotatedGallery = () => (
    <GalleryPageW>
      <p style={{ fontSize: "1.5em" }}>
        This gallery shows advanced use cases of LogoJS, including the use of various
        SVG elements to annotate logos. Users with knowledge of SVG can take advantage
        of the flexibility of LogoJS to create highly customized and interactive logos.
      </p>
      <DemoPanel {...ANNOTATED_DEMO} />
      <DemoPanel {...SNP_DEMO} />
      <DemoPanel {...INTERACTION_DEMO} />
    </GalleryPageW>
);
export default AnnotatedGallery;
