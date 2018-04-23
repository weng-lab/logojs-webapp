import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Segment, Container, Button } from 'semantic-ui-react';

const EditorLinks = () => (
    <Segment className="vertical stripe">
      <Container className="text">
	<Icon className="edit" style={{ fontSize: "28pt", fontWeight: 'bold' }} />
	<span style={{ fontSize: "22pt", fontWeight: 'bold' }}>&nbsp; Live Logo Editors</span><br/>
	<p style={{ marginTop: '10px' }}>
	  Paste FASTA-format sequences or a position weight matrix into a textbox to create a sequence logo.
	  Adjust settings or update the data in the textbox and watch the logo update in real-time.
	  Download the logo in SVG format or copy SVG markup to the clipboard.
	</p>
	<p>
	  <Button as={Link} to="/editor/pwm">PWM Editor</Button>
	  <Button as={Link} to="/editor/fasta">Fasta Editor</Button>
	</p>
      </Container>
    </Segment>
);
export default EditorLinks;
