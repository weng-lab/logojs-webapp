import React from 'react';
import { Link } from 'react-router-dom';

import GalleryPageW from '../page';
import DemoPanel from './demopanel';

import { INFORMATION_CONTENT_DEMO, FREQUENCY_DEMO, STARTPOS_DEMO,
         LOWERCASE_DEMO, NOAXIS_DEMO } from './config';

const DNAGallery = () => (
    <GalleryPageW>
      <p style={{ fontSize: "1.5em" }}>
        This gallery illustrates various types of DNA logos which you can create
        with LogosJ. Embedding classic DNA logos requires just 1-2 lines of code,
        but extensive customizations are also possible. Beyond the examples on this
        page, DNA logos can use <Link to="/gallery/negatives">negative letter heights</Link>,&nbsp;
        <Link to="/gallery/dinucleotide">multiple nucleotides per position</Link>,&nbsp;
        and <Link to="/gallery/annotated">advanced annotations</Link>. Click the
        corresponding links for more examples.
      </p>
      <DemoPanel {...INFORMATION_CONTENT_DEMO} />
      <DemoPanel {...FREQUENCY_DEMO} />
      <DemoPanel {...STARTPOS_DEMO} />
      <DemoPanel {...LOWERCASE_DEMO} />
      <DemoPanel {...NOAXIS_DEMO} />
    </GalleryPageW>
);
export default DNAGallery;
