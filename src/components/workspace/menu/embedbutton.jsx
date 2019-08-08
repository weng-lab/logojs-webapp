import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

import EmbedModal from './embedmodal';

class EmbedButton extends React.Component {

    constructor(props) {
	super(props);
	this.state = {
	    modalshown: false
	};
    }

    _modalClosed() {
	this.setState({
	    modalshown: false
	});
    }

    _showModal() {
	this.setState({
	    modalshown: true
	});
    }

    render() {
	return (
            <React.Fragment>
              <EmbedModal open={this.state.modalshown} data={this.props.data} react={this.props.react}
		          onClose={this._modalClosed.bind(this)} additionaltext={this.props.additionaltext} />
              <Menu.Item link>
	        <span onClick={this._showModal.bind(this)}>
		  <Icon className="code" style={{ color: "#000", fontSize: this.props.iconsize }} /><br />
		  <div style={{ fontSize: this.props.labelsize, color: "#000" }}>{this.props.labeltext}</div>
	        </span>
	      </Menu.Item>
            </React.Fragment>
	);
    }
    
};
export default EmbedButton;
