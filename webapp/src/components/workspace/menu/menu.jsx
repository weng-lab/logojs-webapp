import React from 'react';
import { Menu } from 'semantic-ui-react';

const LogoMenu = ({ width, background, children }) => (
    <Menu style={{ width, background, textAlign: 'center' }}>
      {children}
    </Menu>
);
export default LogoMenu;
