import React from 'react';
import { Grid, Icon, Button, Menu } from 'semantic-ui-react';
import { Logo } from 'logos-to-go-react';

import MEMELogoMenu from './menu';

class MEMEFileUploader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pwms: [],
            errors: [],
            processed: 0,
            total: 0,
            selectedfile: 0,
            selectedmotif: 0
        };
    }


    
    render() {

        return (

        );
    }
    
}
export default MEMEFileUploader;
