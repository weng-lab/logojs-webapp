import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const OPTIONS = [
    { value: 'DNA', text: 'DNA' },
    { value: 'RNA', text: 'RNA' },
    { value: 'AA', text: 'protein' },
    { value: 'custom', text: 'custom' }
];

const LogoTypeDropdown = ({ header, onChange }) => (
    <React.Fragment>
      {header ? <h3>{header}</h3> : null }
      <Dropdown
	options={OPTIONS}
	defaultValue="DNA"
	onChange={onChange}
      />
    </React.Fragment>
)
export default LogoTypeDropdown;