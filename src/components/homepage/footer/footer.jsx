import React from 'react';
import { Segment, Container, Grid, Header, List } from 'semantic-ui-react';

const Footer = props => (
    <Segment inverted vertical>
      <Container>
        <Grid divided inverted style={{ marginTop: "1em", marginBottom: "3em" }}>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4">
                About
              </Header>
              <List link inverted>
                <List.Item as='a'>Gallery</List.Item>
                <List.Item as='a'>Batch generation</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4">
                Documentation
              </Header>
              <List link inverted>
                <List.Item as='a'>Installing the package</List.Item>
                <List.Item as='a'>Visual examples</List.Item>
                <List.Item as='a'>Full documentation</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header inverted as="h4">
                Code, Contributing, and Deploying an Instance
              </Header>
              <p style={{ color: "#ffffff88" }}>
                LogosJ is fully open-source. The package is available via NodeJS or for static inclusion;
                see <strong>installing the package</strong> at left for more information. Contributions
                to the codebase are welcome. For more information, see our&nbsp;
                <a href="https://www.github.com/weng-lab/logosj-package">GitHub</a>.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
);
export default Footer;
