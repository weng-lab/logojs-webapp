import React from 'react';
import * as os from 'os';

import { PWMEditor } from '../../../editor/index';

const formatPWM = ppm => (
    '[' + os.EOL + ppm.map( row => (
        "    [" + row.join(", ") + ']'
    )).join("," + os.EOL) + os.EOL + ']'
);

const WorkspacePWMEditor = ({ logo, onPWMChange }) => (
    <PWMEditor
        height="100%" width="100%"
        text={formatPWM(logo.ppm)}
        onChange={result => onPWMChange(result.parsed)}
        alphabetlength={logo.alphabet.length} />
);
export default WorkspacePWMEditor;
