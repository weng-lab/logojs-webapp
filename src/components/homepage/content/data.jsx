import React from 'react';
import { Grid, Header, Button, Icon } from 'semantic-ui-react';

const DataUpload = props => (
    <Grid.Row>
      <Grid.Column width={11}>
        <Header as="h1">
          Upload results for batch generation
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          Upload data from MEME, Jaspar, or other tools and batch convert them to SVG format.
          Edit the logos or download them individually or all together in a ZIP archive. Obtain
          code to embed the logos or permalinks to share them.
        </p>
        <Button>Upload now</Button>
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={3}>
        <Icon className="upload" style={{ fontSize: "80pt", color: "#000" }} />
      </Grid.Column>
      <Grid.Column width={1} />
    </Grid.Row>
);
export default DataUpload;
