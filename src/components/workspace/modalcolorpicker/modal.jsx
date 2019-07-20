import React from 'react';
import { Modal, Button, Input, Icon, Header, Grid } from 'semantic-ui-react';

import ColorPicker from './colorpicker';

const padColors = glyph => {
    if (!glyph || !glyph.color || !glyph.regex) return null;
    const colors = glyph.color.map ? glyph.color : [ glyph.color ];
    let r = [ ...colors ];
    for (let i = r.length; i < glyph.regex.length; ++i)
        r.push(colors[colors.length - 1]);
    return r;
};

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

    onColorChange(colors, color, i) {
	let glyph = { ...this.state.glyph };
	glyph.color = [ ...colors ];
        glyph.color[i] = color;
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
        let colors = this.state.glyph && this.state.glyph.color && this.state.glyph.color.map ? (
            this.state.glyph.color.length !== this.state.glyph.regex.length ? (
                padColors(this.state.glyph)
            ) : this.state.glyph.color
        ) : padColors(this.state.glyph);
	return (
	    <Modal style={{ marginTop: '0px' }} open={this.props.open} onClose={ () => this.props.onClose(this.state.glyph) }>
	      <Modal.Header><h2>Glyph Editor</h2></Modal.Header>
	      { this.props.glyph && this.state.glyph && (
		  <Modal.Content>
		    <strong>Symbol:</strong>&nbsp;
		    <Input defaultValue={this.props.glyph.regex} style={{ width: '20%' }}
			   onChange={ this.onSymbolChange.bind(this) } /><br/><br/>
                    <Grid>
                      <Grid.Row>
                        { colors && colors.map( (color, i) => (
                            <Grid.Column width={5}>
                              <Header as="h2">{this.state.glyph.regex[i]}</Header>
		              <ColorPicker color={ color }
		                           onChangeComplete={ color => this.onColorChange(colors, color, i) } />
                            </Grid.Column>
                        ))}
                      </Grid.Row>
                    </Grid>
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
