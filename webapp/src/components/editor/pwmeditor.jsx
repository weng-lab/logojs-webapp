import React from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/dawn';

const SETOPTIONS = {
    showLineNumbers: true,
    tabSize: 2
};

class PWMEditor extends React.Component {
    
    _onChange(text) {
	try {
	    this.props.onChange && this.props.onChange({
		text,
		parsed: JSON.parse(text)
	    });
	} catch (e) {
	}
    }

    render() {
	return (
	    <AceEditor
              height={this.props.height} width={this.props.width}
	      mode="javascript" theme="dawn"
              name={this.props.name} onChange={this._onChange.bind(this)}
              fontSize={16} showPrintMargin={false} showGutter={true}
              highlightActiveLine={true} value={this.props.text}
              setOptions={SETOPTIONS}
	    />
	);
    }
    
};
export default PWMEditor;
