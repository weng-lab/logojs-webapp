import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Segment, Header, Button } from 'semantic-ui-react';
import { LogoWithNegatives, ProteinAlphabet, DNAAlphabet } from 'logos-to-go-react';

import { AA_PWM, DNA_NEGATIVE_PWM, DNA_NEGATIVE_PWM2 } from './constants';

const NegativesPreview = () => (
    <Segment.Group>
      <Segment style={{ backgroundColor: "#f8f8f8" }}>
        <Header as="h2" style={{ marginBottom: "0em" }}>Negative Values</Header>
      </Segment>
      <Segment>
        <Grid style={{ textAlign: "center" }}>
          <Grid.Row>
            <Grid.Column width={16}>
              Logos with symbols extending below the x-axis.
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={4} style={{ textAlign: "center" }}>
              <div style={{ fontStyle: "italic", marginBottom: "0.7em" }}>
                protein logo
              </div>
              <LogoWithNegatives alphabet={ProteinAlphabet} pwm={AA_PWM} startpos={1} />
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4} style={{ textAlign: "center" }}>
              <div style={{ fontStyle: "italic", marginBottom: "0.7em" }}>
                negative values semitransparent
              </div>
              <LogoWithNegatives alphabet={DNAAlphabet} pwm={DNA_NEGATIVE_PWM} startpos={1} negativealpha={101} />
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4} style={{ textAlign: "center" }}>
              <div style={{ fontStyle: "italic", marginBottom: "0.7em" }}>
                negative value letters right side up
              </div>
              <LogoWithNegatives alphabet={DNAAlphabet} pwm={DNA_NEGATIVE_PWM2} startpos={1} negativealpha={95} inverted />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ textAlign: "center" }}>
            <Grid.Column width={16}>
              <Button as={Link} to="/gallery/negatives">See More</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Segment.Group>
);
export default NegativesPreview;
