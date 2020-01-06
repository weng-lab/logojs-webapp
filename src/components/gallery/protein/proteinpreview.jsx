import React from 'react';
import { Link } from 'react-router-dom';

import GalleryPageW from '../page';
import DemoPanel from './demopanel';

import { PROTEIN_DEMO, ALT_DEMO } from './config';

const ProteinGallery = () => (
    <GalleryPageW>
      <p style={{ fontSize: "1.5em" }}>
        This gallery illustrates built-in protein logos, which may be rendered with LogoJS
        using 1-2 lines of code. Beyond the examples on this
        page, protein logos can use <Link to="/gallery/negatives">negative letter heights</Link>,&nbsp;
        <Link to="/gallery/dinucleotide">multiple nucleotides per position</Link>,&nbsp;
        and <Link to="/gallery/annotated">advanced annotations</Link>. Click the
        corresponding links for more examples.
      </p>
      <DemoPanel {...PROTEIN_DEMO} />
      <DemoPanel {...ALT_DEMO} />
    </GalleryPageW>
);
export default ProteinGallery;
