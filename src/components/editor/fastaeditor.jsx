import React from 'react';
import AceEditor from 'react-ace';

import applyFastaTheme from './fastatheme';
import FastaMode from './fastamode';

const SETOPTIONS = {
    showLineNumbers: true,
    tabSize: 2
};

class FastaEditor extends React.Component {

    _updateTheme() {
	    applyFastaTheme(this.props.id, this.props.alphabet);
	    this._mode = FastaMode(this.props.id, this.props.alphabet);
	    this._editor.editor.getSession().setMode(this._mode);
    }
    
    componentDidMount() {
	    this._updateTheme();
    }

    componentDidUpdate() {
	    this._updateTheme();
    }

    _onChange(text) {
	    this.props.onChange && this.props.onChange(text);
    }
    
    render() {
	return (
	    <AceEditor
            height={this.props.height} width={this.props.width}
	        mode="text" theme={"fasta-" + this.props.id}
            name={this.props.name} onChange={this._onChange.bind(this)}
            fontSize={16} showPrintMargin={false} showGutter={true}
            highlightActiveLine={true} value={this.props.text}
            setOptions={SETOPTIONS} key={"_editor_" + this.props.id}
	        ref={ c => { this._editor = c; } } />
	);
    }
    
};
export default FastaEditor;
