import React from 'react';
import { Dropdown, Grid } from 'semantic-ui-react';
import { INFORMATION_CONTENT, FREQUENCY } from 'logosj-react';

import Collapsible from './collapsible';

const OPTIONS = [
    { value: INFORMATION_CONTENT, text: "Information Content" },
    { value: FREQUENCY, text: "Frequency" }
];

const ModeDropdown = ({ header, onChange, onFrequencyChange, backgroundFrequencies, mode }) => (
    <React.Fragment>
      {header ? <h3>{header}</h3> : null }
      <Dropdown
	options={OPTIONS}
        value={mode}
	onChange={onChange} />
      { mode === INFORMATION_CONTENT && (
          <React.Fragment>
            <br /><br />
            <Collapsible activeTitle="Hide background frequencies" inactiveTitle="Show background frequencies">
              <br/>
              <Grid>
                { Object.keys(backgroundFrequencies).map( glyph => (
                    <Grid.Row className="nopadding">
                      <Grid.Column width={3}>
                        <strong>{glyph}</strong>
                      </Grid.Column>
                      <Grid.Column width={9}>
                        <input size={5}
                               maxLength={5}
                               value={"0." + ("" + Math.round(backgroundFrequencies[glyph] * 1000) / 1000).substring(2, 5)}
                               onChange={e => onFrequencyChange && onFrequencyChange(glyph, +e.target.value)} />
                      </Grid.Column>
                    </Grid.Row>
                ))}
              </Grid>
              <br/>
            </Collapsible>
          </React.Fragment>
      )}
    </React.Fragment>
);
export default ModeDropdown;
