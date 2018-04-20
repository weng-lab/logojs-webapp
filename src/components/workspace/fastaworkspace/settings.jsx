import React from 'react';

import { LogoTypeDropdown, ColoredInput, ModeDropdown } from '../settings/index';

const FastaSettingsPanel = ({ onLogoTypeChange, onScaleChange, onStartPosChange,
			    onModeChange, modedefault, logodefault, scaledefault,
			    startposdefault }) => (
    <React.Fragment>
      <LogoTypeDropdown header="Logo Type"
			value={logodefault}
			onChange={onLogoTypeChange} />
      <br />
      <ModeDropdown header="Letter Height"
		    value={modedefault}
		    onChange={onModeChange} />
      <br />
      <ColoredInput defaultValue={scaledefault} onChange={onScaleChange}
		    color="#000000" background="#ffffff"
		    header="Scale Factor" />
      <br />
      <ColoredInput defaultValue={startposdefault} onChange={onStartPosChange}
		    color="#000000" background="#ffffff"
		    header="First Base Number" />
    </React.Fragment>
);
export default FastaSettingsPanel;
