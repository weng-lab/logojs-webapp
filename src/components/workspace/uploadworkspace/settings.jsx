import React from 'react';
import { Menu } from 'semantic-ui-react';

import { ModeDropdown, GlyphList } from '../settings/index';

const SettingsPanel = ({ onLogoTypeChange, onScaleChange, onStartPosChange,
			 onModeChange, modedefault, logodefault, scaledefault,
			 startposdefault, alphabet, onAlphabetUpdate }) => (
			     <Menu vertical style={{ width: '100%', backgroundColor: "#fafafa" }}>
			       <Menu.Item>
				 <ModeDropdown header="Letter Height"
					       value={modedefault}
					       onChange={onModeChange} />
			       </Menu.Item>
			       <Menu.Item>
				 <GlyphList header="Symbol List" alphabet={alphabet} noteditable onAlphabetUpdate={onAlphabetUpdate} />
			       </Menu.Item>
			     </Menu>
			 );
export default SettingsPanel;
