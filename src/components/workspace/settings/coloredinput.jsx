import React from 'react';
import { Input } from 'semantic-ui-react';

const ColoredInput = ({ defaultValue, background, header, color, onChange }) => (
    <React.Fragment>
      {header ? <h2>{header}</h2> : null}
      <Input defaultValue={defaultValue}
	     onChange={onChange}
	     style={{ color }}>
	<input style={{ color, background }} />
      </Input>
    </React.Fragment>
);
export default ColoredInput;
