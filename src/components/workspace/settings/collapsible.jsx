import React from 'react';
import { Accordion, Icon } from 'semantic-ui-react';

class Collapsible extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: true
        };
    }

    toggle() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    
    render() {
        return (
            <Accordion>
              <Accordion.Title onClick={this.toggle.bind(this)}>
                {this.state.collapsed ? this.props.inactiveTitle : this.props.activeTitle}
                <Icon name={this.state.collapsed ? "caret right" : "caret down"} />
              </Accordion.Title>
              <Accordion.Content active={!this.state.collapsed}>
                {this.props.children}
              </Accordion.Content>
            </Accordion>
        );
    }
    
};
export default Collapsible;
