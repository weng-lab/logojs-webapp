import React from 'react';
import GalleryPageW from '../page';
import DemoPanel from './demopanel';

import { METHYL_DEMO, RNA_DEMO, HEX_DEMO, DUPLICATE_DEMO } from './config';

const ExtendedAlphabetGallery = () => (
    <GalleryPageW>
      <p style={{ fontSize: "1.5em" }}>
        This gallery illustrates the use of custom alphabets in logos. RNA logos
        can be rendered with 1-2 lines of code, and custom alphabets can be created with
        just a few more. LogoJS uses a custom font which supports upper case letters,
        lower case letters, and the digits 0-9, but you can design custom glyphs and use
        them in your logos too.
      </p>
      <DemoPanel {...RNA_DEMO} />
      <DemoPanel {...METHYL_DEMO} />
      <DemoPanel {...HEX_DEMO} />
      <DemoPanel {...DUPLICATE_DEMO} />
    </GalleryPageW>
);
export default ExtendedAlphabetGallery;
