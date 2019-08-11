import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import cleaner from 'pretty';

import SVGModal from './svgmodal';
import { _svgdata } from '../../svgdownload/utils';

class SVGCopyButton extends React.Component {

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
              <SVGModal open={this.state.modalshown}
                        svg={cleaner(_svgdata(this.props.svgref))}
		        onClose={this._modalClosed.bind(this)}
                        additionaltext={this.props.additionaltext} />
              <Menu.Item link>
	        <span onClick={this._showModal.bind(this)}>
		  <Icon className="copy outline" style={{ color: "#000", fontSize: this.props.iconsize }} /><br />
		  <div style={{ fontSize: this.props.labelsize, color: "#000" }}>{this.props.labeltext}</div>
	        </span>
	      </Menu.Item>
            </React.Fragment>
	);
    }
    
};
export default SVGCopyButton;
