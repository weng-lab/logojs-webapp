import React from 'react';
import GalleryPageW from '../page';
import DemoPanel from './demopanel';

import { INFORMATION_CONTENT_DEMO, FREQUENCY_DEMO, STARTPOS_DEMO,
         LOWERCASE_DEMO, NOAXIS_DEMO } from './config';

const DNAGallery = () => (
    <GalleryPageW>
      <DemoPanel {...INFORMATION_CONTENT_DEMO} />
      <DemoPanel {...FREQUENCY_DEMO} />
      <DemoPanel {...STARTPOS_DEMO} />
      <DemoPanel {...LOWERCASE_DEMO} />
      <DemoPanel {...NOAXIS_DEMO} />
    </GalleryPageW>
);
export default DNAGallery;
