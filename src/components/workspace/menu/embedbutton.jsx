import React from 'react';

import { _svgdata } from '../../svgdownload/utils';
import { CopyTextButton } from './copytextmodal/index';

const INSTRUCTIONS = "To embed your logo in a webpage, simply copy this HTML tag"
      + " and paste it in the desired location:";

const EmbedButton = ({ getsvgref, logoinfo, labelsize, labeltext, iconsize }) => (
    <CopyTextButton options={ { body: JSON.stringify(logoinfo) } } data={getsvgref}
		    dataformatter={ data => '<img src="data:image/svg+xml;base64,' + Buffer.from(_svgdata(data())).toString("base64") + '">' } iconclass="code"
                    iconsize={iconsize} labelsize={labelsize} labeltext={labeltext}
                    modalheader="Embed code generated!" additionaltext={INSTRUCTIONS} />
);
export default EmbedButton;
