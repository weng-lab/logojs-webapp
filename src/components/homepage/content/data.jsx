import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Button, Icon } from 'semantic-ui-react';

const DataUpload = props => (
    <Grid.Row>
      <Grid.Column width={11}>
        <Header as="h1">
          Data upload: batch convert output from other tools
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          Upload data from MEME, Jaspar, or other tools and batch convert them to SVG format.
          Edit the logos or download them individually or all together in a ZIP archive. Obtain
          code to embed the logos or permalinks to share them.
        </p>
        <Button as={Link} to="/upload/">Data Upload</Button>
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={3}>
        <Icon className="upload" style={{ fontSize: "80pt", color: "#000" }} />
      </Grid.Column>
      <Grid.Column width={1} />
    </Grid.Row>
);
export default DataUpload;
