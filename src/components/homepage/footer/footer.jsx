import React from 'react';
import { Link } from 'react-router-dom';
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
                <List.Item as={Link} to="/gallery/">Gallery</List.Item>
                <List.Item as='a' href="https://www.github.com/weng-lab/logojs-package">
                  GitHub
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4">
                Documentation
              </Header>
              <List link inverted>
                <List.Item as='a' href="https://github.com/weng-lab/logojs-package#using-in-your-web-application">Installing the package</List.Item>
                <List.Item as={Link} to="/gallery/">Visual examples</List.Item>
                <List.Item as='a' href="https://weng-lab.github.io/logojs-package">
                  Full documentation
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header inverted as="h4">
                Code, Contributing, Embedding, and Deploying
              </Header>
              <p style={{ color: "#ffffff88" }}>
                LogoJS is fully open-source. The package is available via NodeJS or for static inclusion;
                see <strong>installing the package</strong> at left for more information. Contributions
                to the codebase are welcome. For more information, see our&nbsp;
                <a href="https://www.github.com/weng-lab/logojs-package">GitHub</a>.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
);
export default Footer;
