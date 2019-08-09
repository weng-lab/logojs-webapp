import React from 'react';
import GalleryPageW from '../page';
import DemoPanel from './demopanel';

import { PROTEIN_DEMO, ALT_DEMO } from './config';

const ProteinGallery = () => (
    <GalleryPageW>
      <DemoPanel {...PROTEIN_DEMO} />
      <DemoPanel {...ALT_DEMO} />
    </GalleryPageW>
);
export default ProteinGallery;
