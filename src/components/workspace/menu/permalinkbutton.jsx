import React from 'react';
import { Menu } from 'semantic-ui-react';

import { CopyTextButton } from './copytextmodal/index';

const PermalinkButton = ({ url, logoinfo, labelsize, labeltext, iconsize }) => (
    <CopyTextButton url={url} options={ { body: JSON.stringify(logoinfo) } }
		    dataformatter={ data => url + data.uuid } iconclass="linkify"
                    iconsize={iconsize} labelsize={labelsize} labeltext={labeltext}
                    modalheader="Permalink generated!" />
);
export default PermalinkButton;
