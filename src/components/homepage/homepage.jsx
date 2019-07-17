import React from 'react';
import { Segment, Grid, Container } from 'semantic-ui-react';

import { MainMasthead, MainMenu } from './masthead';
import { Footer } from './footer';
import { mainMenuItems } from './config';
import { Editors, DataUpload, Embedding, ContentDivider } from './content';

const HomePage = props => (
    <React.Fragment>
      <MainMasthead>
        <MainMenu fixed items={mainMenuItems.items} active={mainMenuItems.defaultActive} />
      </MainMasthead>
      <Segment vertical>
        <Container>
          <Grid className="middle aligned">
            <Grid.Row style={{ height: "5em" }} />
            <Editors />
            <ContentDivider />
            <DataUpload />
            <ContentDivider />
            <Embedding />
            <Grid.Row style={{ height: "5em" }} />
          </Grid>
        </Container>
      </Segment>
      <Footer />
    </React.Fragment>
);
export default HomePage;
