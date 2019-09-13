import React from 'react';
import { Input } from 'semantic-ui-react';

const ColoredInput = ({ defaultValue, background, header, color, onChange }) => (
    <React.Fragment>
      {header ? <h3>{header}</h3> : null}
      <Input defaultValue={defaultValue}
	     onChange={onChange}
	     style={{ color }}
             maxLength={15}>
	<input style={{ color, background }} />
      </Input>
    </React.Fragment>
);
export default ColoredInput;
