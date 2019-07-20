import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Segment, Header, Button } from 'semantic-ui-react';
import { RawLogo, DNAGlyphmap, AAGlyphmap } from 'logos-to-go-react';

import { ANNOTATED_PWM, ANNOTATED_GLYPHMAP, SNP_PWM, SNP_REF_PWM,
         DNA_PROTEIN_PWM, PROTEIN_DNA_PWM } from './constants';

const AnnotatedPreview = () => (
    <Segment.Group>
      <Segment style={{ backgroundColor: "#f8f8f8" }}>
        <Header as="h2" style={{ marginBottom: "0em" }}>Annotated Logos</Header>
      </Segment>
      <Segment>
        <Grid style={{ textAlign: "center" }}>
          <Grid.Row>
            <Grid.Column width={16}>
              Logos with custom annotations layered on.
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={4} style={{ textAlign: "center" }}>
              <div style={{ fontStyle: "italic", marginBottom: "0.7em" }}>
                Important regions boxed and highlighted
              </div>
              <svg viewBox={"0 0 " + (ANNOTATED_PWM.length * 100 + 30) + " 330"}>
                <g transform="translate(20,-40)">
                  <RawLogo glyphmap={ANNOTATED_GLYPHMAP} pwm={ANNOTATED_PWM} glyphWidth={100} stackHeight={300} />
                </g>
                <rect fill="none" stroke="#888888" strokeWidth="25" x={15} y={10} width={600} height={300} />
                <rect fill="none" stroke="#888888" strokeWidth="25" x={915} width={600} y={10} height={300} />
              </svg>
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4} style={{ textAlign: "center" }}>
              <div style={{ fontStyle: "italic", marginBottom: "0.7em" }}>
                Logo with SNP highlighted
              </div>
              <svg viewBox={"0 0 " + (SNP_PWM.length * 100 + 300) + " 420"}>
                <rect x={600} width={100} height={420} fill="#bbbbbb" />
                <g transform="translate(300,0)">
                  <RawLogo glyphmap={DNAGlyphmap} pwm={SNP_PWM} glyphWidth={100} stackHeight={200} />
                </g>
                <g transform="translate(300, 220)">
                  <RawLogo glyphmap={DNAGlyphmap} pwm={SNP_REF_PWM} glyphWidth={100} stackHeight={200} />
                </g>
                <text y={150} x={260} textAnchor="end" style={{ fontSize: "50px" }}>PWM</text>
                <text y={350} x={260} textAnchor="end" style={{ fontSize: "50px" }}>reference</text>
              </svg>
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4} style={{ textAlign: "center" }}>
              <div style={{ fontStyle: "italic", marginBottom: "0.7em" }}>
                Protein DNA interaction logo
              </div>
              <svg viewBox={"0 0 2600 920"}>
                <RawLogo glyphmap={DNAGlyphmap} pwm={DNA_PROTEIN_PWM} glyphWidth={100} stackHeight={200} />
                <g transform="translate(0,500)">
                  <RawLogo glyphmap={AAGlyphmap} pwm={PROTEIN_DNA_PWM} glyphWidth={100} stackHeight={400} />
                </g>
                <path fill="#88888888" d="M 1530 220 L 1600 590 L 1700 590 L 1630 220 L 1530 220" />
                <path fill="#88888888" d="M 1670 220 L 1200 520 L 1300 520 L 1750 220 L 1670 220" />
                <path fill="#88888888" d="M 1750 220 L 1100 520 L 1200 520 L 1800 220 L 1750 220" />
              </svg>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ textAlign: "center" }}>
            <Grid.Column width={16}>
              <Button as={Link} to="/gallery/annotated">See More</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Segment.Group>
);
export default AnnotatedPreview;
