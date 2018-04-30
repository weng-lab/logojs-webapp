import React from 'react';
import { ChromePicker } from 'react-color';

import { colorNameFromHex, hexFromColorName } from '../../../common/utils';

const ColorPicker = ({ color, onChangeComplete }) => (
    <div>
      <strong>Color:&nbsp;</strong>{ colorNameFromHex(color) }<br/>
      <ChromePicker color={hexFromColorName(color)} onChangeComplete={ x => onChangeComplete(x.hex) } />
    </div>
);
export default ColorPicker;
