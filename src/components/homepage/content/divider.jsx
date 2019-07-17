import React from 'react';
import { Grid, Divider } from 'semantic-ui-react';

const ContentDivider = props => (
    <Grid.Row style={{ height: "7.5em" }}>
      <Grid.Column width={3}/>
      <Grid.Column width={10}>
        <Divider style={{ borderTop: "1px solid #eeeeee" }} />
      </Grid.Column>
    </Grid.Row>
);
export default ContentDivider;
