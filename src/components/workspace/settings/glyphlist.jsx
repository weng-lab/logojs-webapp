import React from 'react';
import { Label, Icon, Button } from 'semantic-ui-react';
import { DNAAlphabet, RNAAlphabet, ProteinAlphabet } from 'logosj-react';

import { colorNameFromHex, foregroundColor } from '../../../common/utils';
import { ColorPickerModal } from '../modalcolorpicker/index';
import Collapsible from './collapsible';

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
	    alphabet: props.alphabet,
	    modalkey: -1
	};
    }

    componentWillReceiveProps(props) {
	this.setState({
	    alphabet: props.alphabet,
	    modalkey: -1
	});
    }
    
    onGlyphUpdate(glyphdata) {
	let alphabet = [...this.props.alphabet];
	alphabet[this.state.modalkey] = glyphdata;
	this.props.onAlphabetUpdate(alphabet);
    }

    showModal(i) {
	this.setState({
	    modalkey: i
	});
    }

    removeIdx(i) {
	let alphabet = [...this.props.alphabet];
	alphabet.splice(i, 1);
	this.props.onAlphabetUpdate(alphabet);
    }

    addGlyph() {
	let alphabet = [
	    ...this.props.alphabet,
	    { color: "#cccccc", regex: '' }
	];
	this.setState({
	    alphabet,
	    modalkey: alphabet.length - 1
	});
    }
    
    render() {
	return (
	    <React.Fragment>
	      <h3>{this.props.header}</h3>
              <Collapsible activeTitle="Hide presets" inactiveTitle="Select a preset">
                { this.state.alphabet.length <= 4 && (
                    <React.Fragment>
                      <Button onClick={() => this.props.onAlphabetUpdate && this.props.onAlphabetUpdate(DNAAlphabet)}>DNA</Button>&nbsp;
                      <Button onClick={() => this.props.onAlphabetUpdate && this.props.onAlphabetUpdate(RNAAlphabet)}>RNA</Button>&nbsp;
                    </React.Fragment>
                )}
                <Button onClick={() => this.props.onAlphabetUpdate && this.props.onAlphabetUpdate(ProteinAlphabet)}>protein</Button>
              </Collapsible><br/>
	      {this.state.alphabet.map( (glyphdata, i) => (
		  <GlyphLabel i={i} symbol={glyphdata.regex} color={glyphdata.color.map ? glyphdata.color[0] : glyphdata.color}
			      onClick={ () => this.showModal(i) } onRemove={ () => this.removeIdx(i) }
		              noteditable={this.props.noteditable} key={i} />
	      ))}
	    {!this.props.noteditable && (
		<AddLabel color="#cccccc"
	                  onClick={ this.addGlyph.bind(this) } />
	    )}
	      <ColorPickerModal open={this.state.modalkey !== -1}
	                        onClose={this.onGlyphUpdate.bind(this)}
	                        glyph={this.state.alphabet[this.state.modalkey]} />
	    </React.Fragment>
	);
    }
    
};
export default GlyphList;
