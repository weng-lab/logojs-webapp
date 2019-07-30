import React, { useState, useMemo, useRef } from 'react';
import { Grid } from 'semantic-ui-react';
import { DNALogo, RNALogo, AALogo, DNAGlyphmap, CompleteGlyphmap, CompleteLogo,
    RNAGlyphmap, AAGlyphmap, Logo, INFORMATION_CONTENT } from 'logos-to-go-react';

import { glyphsymbols, TYPEID } from '../../../common/utils';

import SettingsPanel from './settings';
import LogoMenu from './menu';

const LOGOCOMPONENTS = {
    DNA: { component: DNALogo, glyphs: DNAGlyphmap, defaultpwm: [[1.0, 0.0, 0.0, 0.0]] },
    RNA: { component: RNALogo, glyphs: RNAGlyphmap, defaultpwm: [[1.0, 0.0, 0.0, 0.0]] },
    AA: { component: AALogo, glyphs: AAGlyphmap, defaultpwm: [[1.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
    custom: { component: CompleteLogo, glyphs: CompleteGlyphmap, defaultpwm: [[1.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] }
};

const GLYPHSYMBOLS = glyphsymbols();

const LogoWithMenu = ({ name, pwm }) => {
    const ref = useRef();
    const getSvgRef = useMemo(() => ref.current, []);

    const [mode, setMode] = useState(INFORMATION_CONTENT);
    const onModeChange = (e, data) => setMode(data.value);
    const [selectedGlyphmap, setSelectedGlyphmap] = useState(pwm.glyphmap || LOGOCOMPONENTS["DNA"].glyphs);
    const onGlyphmapUpdate = (glyphmap) => {
        let nglyphmap = [];
        glyphmap.map( v => {
            let symbol = GLYPHSYMBOLS[v.regex] && GLYPHSYMBOLS[v.regex].component;
            return symbol && nglyphmap.push({ ...v, component: GLYPHSYMBOLS[v.regex].component });
        });
        setSelectedGlyphmap(glyphmap);
    };

    const logoinfo = {
        pwm,
        scale: 1.0,
        typeid: TYPEID['DNA'],
        isfreq: mode !== INFORMATION_CONTENT,
        firstbase: 0
    };

    return (
        <Grid.Row style={{ alignItems: 'center' }}>
            <Grid.Column  width={3}>
                <SettingsPanel
                    glyphmap={selectedGlyphmap}
                    onGlyphmapUpdate={onGlyphmapUpdate}
                    modedefault={mode}
                    onModeChange={onModeChange}
                />
            </Grid.Column>
            <Grid.Column  width={13}>
                <h4>{name}</h4>
                <LogoMenu
                    getsvgref={getSvgRef}
                    logoinfo={logoinfo} />
                <div
                    ref={ref} 
                    style={{ textAlign: "center" }} >
                    <Logo
                        width='90%'
                        pwm={pwm.pwm}
                        startpos={0}
                        mode={mode}
                        glyphmap={selectedGlyphmap} />
                </div>
            </Grid.Column>
        </Grid.Row>
    );
};
export default LogoWithMenu;