import React from 'react';
import { Header, Grid, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Editors = props => (
    <Grid.Row>
      <Grid.Column width={4} style={{ textAlign: "center", verticalAlign: "middle" }}>
        <Icon className="edit" style={{ fontSize: "80pt", color: "#000" }} />
      </Grid.Column>
      <Grid.Column width={12}>
        <Header as="h1">
          Editors: edit your logos in real time
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          Paste FASTA-format sequences or a position weight matrix into a textbox to create a sequence logo.
          Adjust settings or update the data in the textbox and watch the logo update in real-time.
          Download the logo in SVG format, obtain code for embedding it in your page, or get a permalink to share.
        </p>
        <Button as={Link} to="/editor/fasta/">FASTA Editor</Button>&nbsp;
        <Button as={Link} to="/editor/ppm/">PWM Editor</Button>
      </Grid.Column>
    </Grid.Row>
);
export default Editors;
