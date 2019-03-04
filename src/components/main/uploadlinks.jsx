import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Segment, Container, Button } from 'semantic-ui-react';

const UploadLinks = () => (
    <Container className="text">
      <Icon className="upload" style={{ fontSize: "28pt", fontWeight: 'bold' }} />
      <span style={{ fontSize: "22pt", fontWeight: 'bold' }}>&nbsp; Data Upload</span><br/>
      <p style={{ marginTop: '10px' }}>
	Upload data from MEME, Jaspar, or other tools and batch convert them to
	SVG format. Edit the logos or download them individually or all together
	in a ZIP archive.
      </p>
      <p>
	<Button as={Link} to="/editor/meme">MEME Upload</Button>
	<Button as={Link} to="/editor/jaspar">JASPAR Upload</Button>
	<Button as={Link} to="/editor/json">JSON Upload</Button>
      </p>
    </Container>
);
export default UploadLinks;
