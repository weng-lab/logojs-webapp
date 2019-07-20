import React from 'react';
import { Container, Segment, Header } from 'semantic-ui-react';

import { MainMenu, mainMenuItems, Footer } from '../homepage';
import DNAPreview from './dnapreview';
import ProteinPreview from './protein';
import ExtendedAlphabet from './extendedalphabet';
import DinucleotidePreview from './dinucleotide';
import NegativesPreview from './negatives';
import AnnotatedPreview from './annotated';

const GalleryPage = ({ children }) => (
    <React.Fragment>
      <Segment inverted fixed="top" attached="top">
        <Container>
          <MainMenu items={mainMenuItems.items} active="Gallery" fixed={true} />
        </Container>
        <Container style={{ textAlign: "center" }}>
          <Header as="h1" inverted style={{ fontSize: "2.5em", marginTop: "0.15em" }}>
            Gallery
          </Header>
        </Container>
      </Segment>
      <Container>
        <div style={{ height: "3em" }} />
        <p style={{ fontSize: "1.5em" }}>
          This gallery illustrates several common and advanced use cases
          for LogosJ, along with code samples. Click the <strong>see more</strong>&nbsp;
          buttons to see how to adjust a particular logo and embed it in your site.<br /><br />
          LogosJ can accommodate use cases beyond the ones shown here.
          Full documentation is available at our&nbsp;
          <a href="https://www.github.com/weng-lab/logosj-package">GitHub</a>.<br /><br />
        </p>
        <DNAPreview />
        <ProteinPreview />
        <ExtendedAlphabet />
        <DinucleotidePreview />
        <NegativesPreview />
        <AnnotatedPreview />
        <div style={{ height: "3em" }} />
      </Container>
      <Footer />
    </React.Fragment>
);
export default GalleryPage;
