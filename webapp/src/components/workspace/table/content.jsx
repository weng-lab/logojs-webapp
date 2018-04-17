import React from 'react';

const _pct = x => (x + '%');

const TableContent = ({ children, dimensions }) => (
    <tr style={{ height: _pct(dimensions.height), padding: "0px" }}>
      <td width={_pct(100 - dimensions.width)} className="maintable"
	  style={{ padding: "10px", textAlign: "left", verticalAlign: "top" }}>
	{children[0]}
      </td>
      <td width={_pct(dimensions.width)}>
	{children[1]}
      </td>
    </tr>
);
export default TableContent;
