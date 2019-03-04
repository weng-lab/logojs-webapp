import React from 'react';
import { Menu } from 'semantic-ui-react';

import { LogoTypeDropdown, ColoredInput, ModeDropdown, GlyphList } from '../settings/index';

const FastaSettingsPanel = ({ onLogoTypeChange, onScaleChange, onStartPosChange,
			      onModeChange, modedefault, logodefault, scaledefault,
			      startposdefault, glyphmap, onGlyphmapUpdate }) => (
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
                                      <ColoredInput defaultValue={scaledefault} onChange={onScaleChange}
		                                    color="#000000" background="#ffffff"
		                                    header="Scale Factor" />
                                    </Menu.Item>
                                    <Menu.Item>
                                      <ColoredInput defaultValue={startposdefault} onChange={onStartPosChange}
		                                    color="#000000" background="#ffffff"
		                                    header="First Base Number" />
                                    </Menu.Item>
                                    <Menu.Item>
                                      <GlyphList header="Symbol List" glyphmap={glyphmap} onGlyphmapUpdate={onGlyphmapUpdate} />
                                    </Menu.Item>
                                  </Menu>
);
export default FastaSettingsPanel;
