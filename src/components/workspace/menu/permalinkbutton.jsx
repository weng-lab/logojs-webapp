import React from 'react';

import { encodePermalink } from '../../../utilities/permalink';
import { CopyTextButton } from './copytextmodal/index';

const PermalinkButton = ({ url, logoinfo, labelsize, labeltext, iconsize }) => (
    <CopyTextButton dataformatter={encodePermalink} iconclass="linkify" data={logoinfo}
                    iconsize={iconsize} labelsize={labelsize} labeltext={labeltext}
                    modalheader="Permalink generated!" />
);
export default PermalinkButton;
