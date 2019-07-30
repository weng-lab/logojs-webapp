import React from 'react';
import { Label, Icon } from 'semantic-ui-react';

import { colorNameFromHex, foregroundColor } from '../../../common/utils';
import { ColorPickerModal } from '../modalcolorpicker/index';

const GlyphLabel = ({ i, symbol, color, onClick, onRemove, noteditable }) => (
    <div style={{ marginBottom: '2px' }}>
      <Label style={{ width: '50%', backgroundColor: color, color: foregroundColor(color) }}>
	{symbol + ", " + colorNameFromHex(color)}
	<span style={{ float: 'right' }}>
	  <Icon name="edit" onClick={onClick} />
	  {!noteditable && <Icon name="delete" onClick={onRemove} />}
	</span>
      </Label>
    </div>
);

const AddLabel = ({ color, onClick }) => (
    <div style={{ marginBottom: '2px' }}>
      <Label style={{ width: '50%', backgroundColor: color, color: foregroundColor(color) }}
	     onClick={onClick}>
	add new
	<span style={{ float: 'right' }}>
	  <Icon name="plus" />
	</span>
      </Label>
    </div>
);

class GlyphList extends React.Component {

    constructor(props) {
	super(props);
	this.state = {
	    glyphmap: props.glyphmap,
	    modalkey: -1
	};
    }

    componentWillReceiveProps(props) {
	this.setState({
	    glyphmap: props.glyphmap,
	    modalkey: -1
	});
    }
    
    onGlyphUpdate(glyphdata) {
	let glyphmap = [...this.props.glyphmap];
	glyphmap[this.state.modalkey] = glyphdata;
	this.props.onGlyphmapUpdate(glyphmap);
    }

    showModal(i) {
	this.setState({
	    modalkey: i
	});
    }

    removeIdx(i) {
	let glyphmap = [...this.props.glyphmap];
	glyphmap.splice(i, 1);
	this.props.onGlyphmapUpdate(glyphmap);
    }

    addGlyph() {
	let glyphmap = [
	    ...this.props.glyphmap,
	    { color: "#cccccc", regex: '' }
	];
	this.setState({
	    glyphmap,
	    modalkey: glyphmap.length - 1
	});
    }
    
    render() {
	return (
	    <React.Fragment>
	      <h2>{this.props.header}</h2>
	      {this.state.glyphmap.map( (glyphdata, i) => (
		  <GlyphLabel key={i} i={i} symbol={glyphdata.regex} color={glyphdata.color}
			      onClick={ () => this.showModal(i) } onRemove={ () => this.removeIdx(i) }
		              noteditable={this.props.noteditable} />
	      ))}
	    {!this.props.noteditable && (
		<AddLabel color="#cccccc"
	                  onClick={ this.addGlyph.bind(this) } />
	    )}
	      <ColorPickerModal open={this.state.modalkey !== -1}
	                        onClose={this.onGlyphUpdate.bind(this)}
	                        glyph={this.state.glyphmap[this.state.modalkey]} />
	    </React.Fragment>
	);
    }
    
};
export default GlyphList;
