import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Modal, Button, Icon } from 'semantic-ui-react';

import SyntaxHighlighter from '../../gallery/syntax';
import { CopyButton, CopiedButton } from './permalinkmodal';

class SVGModal extends React.Component { //  = ({ open, onClose, svg }) => (

    constructor(props) {
        super(props);
        this.state = {
            copied: false
        };
    }

    _setCopied(text, success) {
	this.setState({
	    copied: success
	});
    }
    
    render() {
        return (
            <Modal open={this.props.open} onClose={this.props.onClose} style={{ marginTop: '0px' }}>
              <Modal.Header><h2>Copy SVG Markup</h2></Modal.Header>
              <Modal.Content>
                <SyntaxHighlighter language="jsx" className="highlightfixed">
                  {this.props.svg}
                </SyntaxHighlighter>
                <CopyToClipboard text={this.props.svg} onCopy={this._setCopied.bind(this)}>
	          { this.state.copied ? <CopiedButton/> : <CopyButton/> }
	        </CopyToClipboard>
              </Modal.Content>
              <Modal.Actions>
	        <Button onClick={this.props.onClose}>
                  <Icon className="check" />Done
                </Button>
              </Modal.Actions>
            </Modal>
        );
    }
    
}
export default SVGModal;
