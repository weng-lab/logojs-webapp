import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';

import { AJAXPOSTButton } from '../../ajaxbutton/index';
import PermalinkModal from './permalinkmodal';

class PermalinkButton extends React.Component {

    constructor(props) {
	super(props);
	this.state = {
	    modalshown: false,
	    permalinkurl: ''
	};
    }

    _modalClosed() {
	this.setState({
	    modalshown: false
	});
    }

    _showModal(data) {
	this.setState({
	    permalinkurl: this.props.url + data.uuid,
	    modalshown: true
	});
    }

    render() {
	return (
	    <Menu.Item link>
	      <AJAXPOSTButton url={this.props.url} options={ { body: JSON.stringify(this.props.logoinfo) } }
			      success={ data => data.json().then(this._showModal.bind(this)) }
 	                      error={console.log}>
		<Icon className="linkify" style={{ color: "#000", fontSize: this.props.iconsize }} /><br />
		<div style={{ fontSize: this.props.labelsize, color: "#000" }}>{this.props.labeltext}</div>
		<PermalinkModal mountnode={this.props.modalmount} open={this.state.modalshown}
				data={this.state.permalinkurl} onClose={this._modalClosed.bind(this)} />
	      </AJAXPOSTButton>
	    </Menu.Item>
	);
    }
    
};
export default PermalinkButton;
