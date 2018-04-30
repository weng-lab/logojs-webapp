import React from 'react';
import { Modal, Button, Input, Icon } from 'semantic-ui-react';

import ColorPicker from './colorpicker';

class ColorPickerModal extends React.Component {

    constructor(props) {
	super(props);
	this.state = {
	    glyph: {...props.glyph}
	};
    }

    componentWillReceiveProps(props) {
	this.setState({
	    glyph: {...props.glyph}
	});
    }

    onColorChange(color) {
	let glyph = {...this.state.glyph};
	glyph.color = color;
	this.setState({
	    glyph
	});
    }

    onSymbolChange(e) {
	let glyph = {...this.state.glyph};
	glyph.regex = e.target.value;
	this.setState({
	    glyph
	});
    }

    render() {
	return (
	    <Modal open={this.props.open} onClose={ () => this.props.onClose(this.state.glyph) }>
	      <Modal.Header><h2>Glyph Editor</h2></Modal.Header>
	      { this.props.glyph && this.state.glyph && (
		  <Modal.Content>
		    <strong>Symbol:</strong>&nbsp;
		    <Input defaultValue={this.props.glyph.regex} style={{ width: '20%' }}
			   onChange={ this.onSymbolChange.bind(this) } /><br/><br/>
		    <ColorPicker color={ this.state.glyph.color }
				 onChangeComplete={ this.onColorChange.bind(this) } />
		  </Modal.Content>
	      )}
	      <Modal.Actions>
	        <Button onClick={() => this.props.onClose(this.state.glyph)}><Icon className="check" />Done</Button>
	      </Modal.Actions>
	    </Modal>
	);
    }
    
};
export default ColorPickerModal;
