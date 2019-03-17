import React from 'react';
import { Menu } from 'semantic-ui-react';

const LogoMenu = ({ width, background, children }) => (
    <Menu secondary style={{ width, textAlign: 'center' }}>
      {children}
    </Menu>
);
export default LogoMenu;
