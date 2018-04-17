import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { INFORMATION_CONTENT, FREQUENCY } from 'logoz-alpha';

const OPTIONS = [
    { value: INFORMATION_CONTENT, text: "Information Content" },
    { value: FREQUENCY, text: "Frequency" }
];

const ModeDropdown = ({ header, onChange }) => (
    <React.Fragment>
      {header ? <h2>{header}</h2> : null }
      <Dropdown
	options={OPTIONS}
	defaultValue={INFORMATION_CONTENT}
	onChange={onChange}
      />
    </React.Fragment>
)
export default ModeDropdown;
