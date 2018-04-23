import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Modal, Button, Input, Icon } from 'semantic-ui-react';

const CopyButton = ({ onClick }) => (
    <Button><Icon className="copy outline" onClick={onClick} />Copy</Button>
);

const CopiedButton = () => (
    <Button><Icon className="check" />Copied</Button>
);

class PermalinkModal extends React.Component {

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
	    <Modal open={this.props.open} onClose={this.props.onClose}>
	      <Modal.Header><h2>Permalink generated!</h2></Modal.Header>
	      <Modal.Content>
	        <Input defaultValue={this.props.data} style={{ width: '80%' }} />&nbsp;
	        <CopyToClipboard text={this.props.data} onCopy={this._setCopied.bind(this)}>
	          { this.state.copied ? <CopiedButton/> : <CopyButton/> }
	        </CopyToClipboard>
	      </Modal.Content>
	      <Modal.Actions>
	        <Button onClick={this.props.onClose}><Icon className="check" />Done</Button>
	      </Modal.Actions>
	    </Modal>
	);
    }
    
};
export default PermalinkModal;
