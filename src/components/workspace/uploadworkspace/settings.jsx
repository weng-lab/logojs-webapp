import React from 'react';
import { Menu, Button, Header, Form, Radio, Input } from 'semantic-ui-react';
import { FREQUENCY } from 'logojs-react';

import { ModeDropdown, GlyphList, ColoredInput } from '../settings/index';

const CONFIRM = "Are you sure? This action cannot be undone.";

const SettingsPanel = ({ onLogoTypeChange, onScaleChange, onStartPosChange,
			 onModeChange, mode, logodefault, scaledefault, onAlphaChange, negativeAlpha,
			 startposdefault, alphabet, onAlphabetUpdate, onFrequencyChange,
                         backgroundFrequencies, onApplyToFile, onApplyToAll, yAxisAuto,
                         onYAxisToggle, yAxisMax, hasNegatives, inverted, onInvertedToggle }) => (
			     <Menu vertical style={{ width: '100%', backgroundColor: "#fafafa" }}>
                               { !hasNegatives ? (
                                   <React.Fragment>
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
                                   </React.Fragment>
                               ) : (
                                   <React.Fragment>
                                     <Menu.Item>
                                       <Header as="h3">Negative letter orientation</Header>
                                       <Form>
                                         <Form.Field>
                                           <Radio checked={!inverted} label="Upside down" onClick={() => inverted && onInvertedToggle()} />
                                         </Form.Field>
                                         <Form.Field>
				           <Radio checked={inverted} label="Right side up" onClick={() => !inverted && onInvertedToggle()} />
                                         </Form.Field>
                                       </Form>
			             </Menu.Item>
                                     <Menu.Item>
                                       <Header as="h3">Negative letter opacity</Header>
                                       <strong>{negativeAlpha} / 255</strong>
                                       <Form.Input min={0} max={255} onChange={onAlphaChange} step={1} type='range' value={negativeAlpha} />
			             </Menu.Item>
                                   </React.Fragment>
                               )}
                               <Menu.Item>
                                 <ColoredInput header="Starting base number" defaultValue={startposdefault || 1} onChange={onStartPosChange} />
                               </Menu.Item>
			       <Menu.Item>
				 <GlyphList header="Symbol List" alphabet={alphabet} onAlphabetUpdate={onAlphabetUpdate} />
			       </Menu.Item>
                               <Menu.Item>
                                 <Header as="h3">Apply these settings to...</Header>
			         <Button onClick={() => window.confirm(CONFIRM) && onApplyToFile && onApplyToFile(hasNegatives, mode)}>all motifs in the current file</Button><br/><br/>
                                 <Button onClick={() => window.confirm(CONFIRM) && onApplyToAll && onApplyToAll(hasNegatives, mode)}>all loaded motifs</Button>
			       </Menu.Item>
			     </Menu>
			 );
export default SettingsPanel;
