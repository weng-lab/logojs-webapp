import React from 'react';
import GalleryPageW from '../page';
import DemoPanel from './demopanel';

import { AA_DEMO, DNA_DEMO, DNA_DEMO2 } from './config';

const NegativeGallery = () => (
    <GalleryPageW>
      <p style={{ fontSize: "1.5em" }}>
        This gallery illustrates the use of both negative and positive symbol heights.
        Logos with negatives are built in to LogosJ and may be rendered with 1-2 lines of code.
        Various customizations are built in, including the ability to shade negative letters
        and render them right side up or upside down.
      </p>
      <DemoPanel {...AA_DEMO} />
      <DemoPanel {...DNA_DEMO} />
      <DemoPanel {...DNA_DEMO2} />
    </GalleryPageW>
);
export default NegativeGallery;
