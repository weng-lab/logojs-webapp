import React from 'react';
import * as os from 'os';

import { PPMEditor } from '../../../editor/index';

const formatPPM = ppm => (
    '[' + os.EOL + ppm.map( row => (
        "    [" + row.join(", ") + ']'
    )).join("," + os.EOL) + os.EOL + ']'
);

const WorkspacePPMEditor = ({ logo, onPPMChange }) => (
    <PPMEditor
        height="100%" width="100%"
        text={formatPPM(logo.ppm)}
        onChange={result => onPPMChange(result.parsed)}
        alphabetlength={logo.alphabet.length} />
);
export default WorkspacePPMEditor;
