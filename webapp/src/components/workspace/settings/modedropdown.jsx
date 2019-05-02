import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { INFORMATION_CONTENT, FREQUENCY } from 'logos-to-go-react';

const OPTIONS = [
    { value: INFORMATION_CONTENT, text: "Information Content" },
    { value: FREQUENCY, text: "Frequency" }
];

const ModeDropdown = ({ header, onChange }) => (
    <React.Fragment>
      {header ? <h3>{header}</h3> : null }
      <Dropdown
	options={OPTIONS}
	defaultValue={INFORMATION_CONTENT}
	onChange={onChange}
      />
    </React.Fragment>
);
export default ModeDropdown;
