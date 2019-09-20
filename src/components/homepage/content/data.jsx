import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Button, Icon } from 'semantic-ui-react';

const DataUpload = props => (
    <Grid.Row>
      <Grid.Column width={11}>
        <Header as="h1">
          Create Logos: paste or upload data in common formats
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          Upload or paste data in MEME, JASPAR, TRANSFAC, or FASTA format to create SVG logos.
          Edit the logos and download them individually in SVG format or all together in a ZIP
          archive. Obtain code to embed the logos in your website or permalinks to share them.
        </p>
        <Button as={Link} to="/create/">Create Logos</Button>
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={3}>
        <Icon className="edit" style={{ fontSize: "80pt", color: "#000" }} />
      </Grid.Column>
      <Grid.Column width={1} />
    </Grid.Row>
);
export default DataUpload;
