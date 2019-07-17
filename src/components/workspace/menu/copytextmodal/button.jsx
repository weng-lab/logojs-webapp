import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';

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

    _showModal() {
	this.setState({
	    data: this.props.dataformatter(this.props.data),
	    modalshown: true
	});
    }

    render() {
	return (
            <React.Fragment>
              <Modal open={this.state.modalshown} data={this.state.data} header={this.props.modalheader}
		     onClose={this._modalClosed.bind(this)} additionaltext={this.props.additionaltext} />
              <Menu.Item link>
	        <span onClick={this._showModal.bind(this)}>
		  <Icon className={this.props.iconclass} style={{ color: "#000", fontSize: this.props.iconsize }} /><br />
		  <div style={{ fontSize: this.props.labelsize, color: "#000" }}>{this.props.labeltext}</div>
	        </span>
	      </Menu.Item>
            </React.Fragment>
	);
    }
    
};
export default CopyTextButton;
