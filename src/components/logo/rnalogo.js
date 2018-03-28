import React from 'react';

import { A } from '../glyphs/A';
import { C } from '../glyphs/C';
import { G } from '../glyphs/G';
import { U } from '../glyphs/U';

import Logo from './logo';

const _glyphmap = [
    { component: A, color: "green" },
    { component: C, color: "blue" },
    { component: G, color: "orange" },
    { component: U, color: "red" }
];

const RNALogo = ({ pwm }) => (
    <Logo pwm={pwm} glyphmap={_glyphmap} />
);
export default RNALogo;
