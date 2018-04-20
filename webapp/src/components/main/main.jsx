import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Segment, Container, Header, Button } from 'semantic-ui-react';

class Main extends React.Component {

    render() {
	return (
	    <React.Fragment>
	      <Segment className="vertical inverted masthead center aligned">
		<Container className="text">
		  <Header className="inverted">
		    <h1>Logos-to-go</h1>
		    <h2>biological sequence logo creator</h2>
		  </Header><br/>
		</Container>
	      </Segment>
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
	    </React.Fragment>
	);
    }
    
};
export default Main;
