import React from 'react';
import GalleryPageW from '../page';
import DemoPanel from './demopanel';

import { METHYL_DEMO, RNA_DEMO, HEX_DEMO, DUPLICATE_DEMO } from './config';

const ExtendedAlphabetGallery = () => (
    <GalleryPageW>
      <DemoPanel {...RNA_DEMO} />
      <DemoPanel {...METHYL_DEMO} />
      <DemoPanel {...HEX_DEMO} />
      <DemoPanel {...DUPLICATE_DEMO} />
    </GalleryPageW>
);
export default ExtendedAlphabetGallery;
