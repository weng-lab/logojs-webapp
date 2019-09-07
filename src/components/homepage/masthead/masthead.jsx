import React from 'react';
import { Segment, Container, Header, Button } from 'semantic-ui-react';
import { Link } from "react-router-dom";

const MainMasthead = ({ children }) => (
    <Segment inverted
             textAlign='center'
             style={{ minHeight: 500, padding: '1em 0em' }}
             vertical>
      <Container>
        {children}
      </Container>
      <Container>
        <Header inverted style={{ fontSize: "4em", marginTop: "2.5em" }}>
          LogosJ
        </Header>
        <Header inverted as="h2" style={{ fontWeight: "normal" }}>
          Embeddable, customizable, and interactive sequence logos, all in Javascript.
        </Header>
        <Button as={Link} to="/gallery/" primary className="huge">
          Examples
        </Button>
        <Button as="a" href="https://weng-lab.github.io/logosj-package/" primary className="huge">
          Documentation
        </Button>
      </Container>
    </Segment>
);
export default MainMasthead;
