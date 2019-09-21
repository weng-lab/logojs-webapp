import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Segment, Header, Button } from 'semantic-ui-react';
import { DNALogo } from 'logosj-react';

import { CTCF_PPM, CAP_PPM, INTRON_PPM } from './constants';

const DNAPreview = () => (
    <Segment.Group>
      <Segment style={{ backgroundColor: "#f8f8f8" }}>
        <Header as="h2" style={{ marginBottom: "0em" }}>DNA Logos</Header>
      </Segment>
      <Segment>
        <Grid style={{ textAlign: "center" }}>
          <Grid.Row>
            <Grid.Column width={16}>
              Logos using the standard DNA alphabet.
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={4} style={{ textAlign: "center" }}>
              <div style={{ fontStyle: "italic", marginBottom: "0.7em" }}>
                information content
              </div>
              <DNALogo ppm={CAP_PPM} startpos={1} />
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4} style={{ textAlign: "center" }}>
              <div style={{ fontStyle: "italic", marginBottom: "0.7em" }}>
                frequency
              </div>
              <DNALogo ppm={CTCF_PPM} startpos={1} mode="FREQUENCY" />
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4} style={{ textAlign: "center" }}>
              <div style={{ fontStyle: "italic", marginBottom: "0.7em" }}>
                custom starting base number
              </div>
              <DNALogo ppm={INTRON_PPM} startpos={-18} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ textAlign: "center" }}>
            <Grid.Column width={16}>
              <Button as={Link} to="/gallery/dna">See More</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>      
    </Segment.Group>
);
export default DNAPreview;
