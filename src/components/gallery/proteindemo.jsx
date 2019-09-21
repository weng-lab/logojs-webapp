import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Segment, Header, Button } from 'semantic-ui-react';
import { ProteinLogo } from 'logosj-react';

import { PROTEIN_PPM, ALT_PROTEIN_PPM } from './constants';

const ProteinPreview = () => (
    <Segment.Group>
      <Segment style={{ backgroundColor: "#f8f8f8" }}>
        <Header as="h2" style={{ marginBottom: "0em" }}>Protein Logos</Header>
      </Segment>
      <Segment>
        <Grid style={{ textAlign: "center" }}>
          <Grid.Row>
            <Grid.Column width={16}>
              Logos using amino acid alphabets.
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={6} style={{ textAlign: "center" }}>
              <div style={{ fontStyle: "italic", marginBottom: "0.7em" }}>
                colored by chemical properties
              </div>
              <ProteinLogo ppm={PROTEIN_PPM} startpos={1} />
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={6} style={{ textAlign: "center" }}>
              <div style={{ fontStyle: "italic", marginBottom: "0.7em" }}>
                extended with B (Asx) and Z (Glx)
              </div>
              <ProteinLogo ppm={ALT_PROTEIN_PPM()} startpos={1} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ textAlign: "center" }}>
            <Grid.Column width={16}>
              <Button as={Link} to="/gallery/protein">See More</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Segment.Group>
);
export default ProteinPreview;
