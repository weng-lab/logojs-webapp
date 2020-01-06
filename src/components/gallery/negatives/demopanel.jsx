import React from 'react';
import { Segment, Grid, Header } from 'semantic-ui-react';
import { LogoWithNegatives } from 'logojs-react';

import CodeAccordion from '../code';

export const DemoPanel = ({ reactCodestring, jsCodestring, logoProps, description, header, longDescription }) => (
    <Segment.Group>
      <Segment style={{ backgroundColor: "#f8f8f8" }}>
        <Header as="h2" style={{ marginBottom: "0em" }}>
          {header}
        </Header>
      </Segment>
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as="h4">
                {description}
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={4} style={{ textAlign: "center" }}>
              <LogoWithNegatives startpos={1} {...logoProps} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={14}>
              {longDescription}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <CodeAccordion
                react={reactCodestring}
                js={jsCodestring}
                title="Show Code"
                activeTitle="Hide Code" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Segment.Group>
);
export default DemoPanel;
