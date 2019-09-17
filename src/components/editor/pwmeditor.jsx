import React from 'react';
import AceEditor from 'react-ace';
import * as os from 'os';

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
            if (text.includes('[') || text.includes(']') || text.includes(',')) return;
            const lines = text.split(os.EOL).map( line => (
                line.trim().split(/\s/g).map(parseFloat).filter(x => !isNaN(x))
            ));
            const lengths = lines.map(x => x.length);
            if (Math.max(...lengths) === Math.min(...lengths) && Math.max(...lengths) === this.props.alphabetlength)
                this.props.onChange && this.props.onChange({
                    text: "[\n" + lines.map(x => "  " + JSON.stringify(x).replace(/,/g, ", ")).join(",\n") + "\n]",
                    parsed: lines
                });
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
