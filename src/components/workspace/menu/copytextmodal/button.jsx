import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';

import { AJAXPOSTButton } from '../../../ajaxbutton/index';
import Modal from './modal';

class CopyTextButton extends React.Component {

    constructor(props) {
	super(props);
	this.state = {
	    modalshown: false,
	    data: ""
	};
    }

    _modalClosed() {
	this.setState({
	    modalshown: false
	});
    }

    _showModal(data) {
	this.setState({
	    data: this.props.dataformatter(data),
	    modalshown: true
	});
    }

    render() {
	return (
	    <Menu.Item link>
	      <AJAXPOSTButton url={this.props.url} options={this.props.options}
			      success={data => data.json().then(this._showModal.bind(this))}
		              error={console.log}>
		<Icon className={this.props.iconclass} style={{ color: "#000", fontSize: this.props.iconsize }} /><br />
		<div style={{ fontSize: this.props.labelsize, color: "#000" }}>{this.props.labeltext}</div>
		<Modal open={this.state.modalshown} data={this.state.data} header={this.props.modalheader}
		       onClose={this._modalClosed.bind(this)} additionaltext={this.props.additionaltext} />
	      </AJAXPOSTButton>
	    </Menu.Item>
	);
    }
    
};
export default CopyTextButton;
