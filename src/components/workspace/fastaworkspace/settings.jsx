import React from 'react';
import { Menu, Checkbox } from 'semantic-ui-react';

import { LogoTypeDropdown, ColoredInput, ModeDropdown, GlyphList } from '../settings/index';

const FastaSettingsPanel = ({ onLogoTypeChange, onScaleChange, onStartPosChange,
			      onModeChange, modedefault, logodefault, scaledefault, caseInsensitive,
			      startposdefault, alphabet, onAlphabetUpdate, onCaseChange }) => (
                                  <Menu vertical style={{ width: '100%', backgroundColor: "#fafafa" }}>
				    <Menu.Item>
                                      <LogoTypeDropdown header="Logo Type"
			                                value={logodefault}
			                                onChange={onLogoTypeChange} />
                                    </Menu.Item>
                                    <Menu.Item>
                                      <ModeDropdown header="Letter Height"
		                                    value={modedefault}
		                                    onChange={onModeChange} />
                                    </Menu.Item>
                                    <Menu.Item>
                                      <ColoredInput defaultValue={startposdefault} onChange={onStartPosChange}
		                                    color="#000000" background="#ffffff"
		                                    header="First Base Number" />
                                    </Menu.Item>
                                    <Menu.Item>
                                      <Checkbox checked={caseInsensitive} onClick={onCaseChange} />&nbsp;Case Insensitive
                                    </Menu.Item>
                                    <Menu.Item>
                                      <GlyphList header="Symbol List" alphabet={alphabet} onAlphabetUpdate={onAlphabetUpdate} />
                                    </Menu.Item>
                                  </Menu>
);
export default FastaSettingsPanel;
