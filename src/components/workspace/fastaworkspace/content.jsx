import React from 'react';

const ContentPanel = ({ children, topheight }) => (
    <table style={{ height: "100%", width: "100%" }}>
      <tbody>
	<tr style={{ height: topheight + '%' }}>
	  <td width={16}>
	    {children[0]}
	  </td>
	</tr>
	<tr height={ (100 - topheight) + '%' }
	    style={{ background: "#ffffff", padding: "0px" }}>
	  <td width={16} style={{ verticalAlign: 'top' }}>
	    {children[1]}
          </td>
	</tr>
      </tbody>
    </table>
);
export default ContentPanel;
