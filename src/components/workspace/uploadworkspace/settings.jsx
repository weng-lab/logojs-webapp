import React from 'react';
import { Menu, Button, Header, Form, Radio, Input } from 'semantic-ui-react';
import { FREQUENCY } from 'logosj-react';

import { ModeDropdown, GlyphList, ColoredInput } from '../settings/index';

const CONFIRM = "Are you sure? This action cannot be undone.";

const SettingsPanel = ({ onLogoTypeChange, onScaleChange, onStartPosChange,
			 onModeChange, mode, logodefault, scaledefault,
			 startposdefault, alphabet, onAlphabetUpdate, onFrequencyChange,
                         backgroundFrequencies, onApplyToFile, onApplyToAll, yAxisAuto,
                         onYAxisToggle, yAxisMax }) => (
			     <Menu vertical style={{ width: '100%', backgroundColor: "#fafafa" }}>
			       <Menu.Item>
				 <ModeDropdown header="Letter height"
					       onChange={onModeChange}
                                               onFrequencyChange={onFrequencyChange}
                                               backgroundFrequencies={backgroundFrequencies}
                                               mode={mode} />
			       </Menu.Item>
                               { mode !== FREQUENCY && (
                                   <Menu.Item>
                                     <Header as="h3">y-axis maximum</Header>
                                     <Form>
                                       <Form.Field>
                                         <Radio label="auto" checked={yAxisAuto} onClick={() => onYAxisToggle(true, yAxisMax)} />
                                       </Form.Field>
                                       <Form.Field>
                                         <Radio onClick={() => onYAxisToggle(false, yAxisMax)} checked={yAxisAuto === false} />&nbsp;
                                         <Input maxLength={5} value={("" + yAxisMax).substring(0, 5) + (yAxisMax === Math.floor(yAxisMax) ? '.' : "")} onChange={e => onYAxisToggle(false, +e.target.value)} style={{ width: "70%" }} size="mini" />
                                       </Form.Field>
                                     </Form>
                                     
                                   </Menu.Item>
                               )}
                               <Menu.Item>
                                 <ColoredInput header="Starting base number" defaultValue={startposdefault || 1} onChange={onStartPosChange} />
                               </Menu.Item>
			       <Menu.Item>
				 <GlyphList header="Symbol List" alphabet={alphabet} onAlphabetUpdate={onAlphabetUpdate} />
			       </Menu.Item>
                               <Menu.Item>
                                 <Header as="h3">Apply these settings to...</Header>
			         <Button onClick={() => window.confirm(CONFIRM) && onApplyToFile && onApplyToFile()}>all motifs in the current file</Button><br/><br/>
                                 <Button onClick={() => window.confirm(CONFIRM) && onApplyToAll && onApplyToAll()}>all loaded motifs</Button>
			       </Menu.Item>
			     </Menu>
			 );
export default SettingsPanel;
