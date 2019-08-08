import React from 'react';
import { Segment, Container, Header } from 'semantic-ui-react';

import { MainMenu, mainMenuItems, Footer } from '../homepage';

const GalleryPageW = ({ children }) => (
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
        {children}
        <div style={{ height: "3em" }} />
      </Container>
      <Footer />
    </React.Fragment>
);
export default GalleryPageW;
