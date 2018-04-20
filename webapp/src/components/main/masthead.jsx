import React from 'react';
import { Segment, Container, Header } from 'semantic-ui-react';

const Masthead = () => (
    <Segment className="vertical inverted masthead center aligned">
      <Container className="text">
	<Header className="inverted">
	  <h1>Logos-to-go</h1>
	  <h2>biological sequence logo creator</h2>
	</Header><br/>
      </Container>
    </Segment>
);
export default Masthead;
