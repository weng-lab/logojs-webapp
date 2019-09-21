import React from 'react';
import { Menu } from 'semantic-ui-react';

import { ModeDropdown, GlyphList, ColoredInput } from '../settings/index';

const SettingsPanel = ({ onLogoTypeChange, onScaleChange, onStartPosChange,
			 onModeChange, mode, logodefault, scaledefault,
			 startposdefault, alphabet, onAlphabetUpdate, onFrequencyChange,
                         backgroundFrequencies }) => (
			     <Menu vertical style={{ width: '100%', backgroundColor: "#fafafa" }}>
			       <Menu.Item>
				 <ModeDropdown header="Letter Height"
					       onChange={onModeChange}
                                               onFrequencyChange={onFrequencyChange}
                                               backgroundFrequencies={backgroundFrequencies}
                                               mode={mode} />
			       </Menu.Item>
                               <Menu.Item>
                                 <ColoredInput header="Starting base number" defaultValue={startposdefault || 1} onChange={onStartPosChange} />
                               </Menu.Item>
			       <Menu.Item>
				 <GlyphList header="Symbol List" alphabet={alphabet} onAlphabetUpdate={onAlphabetUpdate} />
			       </Menu.Item>
			     </Menu>
			 );
export default SettingsPanel;
