import React from 'react';
import { Accordion, Icon } from 'semantic-ui-react';

import CodeTab from './codetab';

class CodeAccordion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    toggle() {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        return (
            <Accordion>
              <Accordion.Title active={this.state.open} onClick={this.toggle.bind(this)}>
                <Icon name='dropdown' />
                {this.state.open ? this.props.activeTitle : this.props.title}
              </Accordion.Title>
              <Accordion.Content active={this.state.open}>
                <CodeTab react={"import React from 'react';\n" + this.props.react}
                         js={this.props.js} />
              </Accordion.Content>
            </Accordion>
        );
    }
    
}
export default CodeAccordion;
