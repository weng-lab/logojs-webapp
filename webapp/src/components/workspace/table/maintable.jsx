import React from 'react';

const MainTable = ({ children }) => (
    <table className="maintable">
      <tbody>
	{children}
      </tbody>
    </table>
);
export default MainTable;
