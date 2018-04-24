import React from 'react';
import { Menu } from 'semantic-ui-react';

import { CopyTextButton } from './copytextmodal/index';

const INSTRUCTIONS = "To embed your logo in a webpage, simply copy this HTML tag"
      + " and paste it in the desired location:";

const EmbedButton = ({ url, logoinfo, labelsize, labeltext, iconsize }) => (
    <CopyTextButton url={url} options={ { body: JSON.stringify(logoinfo) } }
		    dataformatter={ data => '<img src="' + url + data.uuid + '">' } iconclass="code"
                    iconsize={iconsize} labelsize={labelsize} labeltext={labeltext}
                    modalheader="Embed code generated!" additionaltext={INSTRUCTIONS} />
);
export default EmbedButton;
