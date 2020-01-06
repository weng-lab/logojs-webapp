import React from 'react';
import GalleryPageW from '../page';
import DemoPanel from './demopanel';

import { DINUCLEOTIDE_DEMO, TRINUCLEOTIDE_DEMO, MULTINUMBER_DEMO } from './config';

const DinucleotideGallery = () => (
    <GalleryPageW>
      <p style={{ fontSize: "1.5em" }}>
        LogoJS supports the use of arbitrary numbers of letters at each position in a logo.
        You can build a custom alphabet with two, three, four, or more letters per symbol.
        To display longer symbols, the glyph width can be adjusted with a built-in property.
        Multiple symbol logos are not restricted to DNA logos; any combination of letters
        and numbers may be used. For more unusual use cases, the same letter can be repeated
        with different colors or multi-letter symbols may be mixed with single-letter symbols.
      </p>
      <DemoPanel {...DINUCLEOTIDE_DEMO} />
      <DemoPanel {...TRINUCLEOTIDE_DEMO} />
      <DemoPanel {...MULTINUMBER_DEMO} />
    </GalleryPageW>
);
export default DinucleotideGallery;
