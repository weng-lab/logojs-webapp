import React from 'react';
import { Tab } from 'semantic-ui-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import SyntaxHighlighter from './syntax';
import { CopyButton, CopiedButton } from '../workspace/menu/permalinkmodal';

class CopyButtonA extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            copied: false
        };
    }

    _setCopied() {
        this.setState({
            copied: true
        });
    }

    render() {
        return (
            <CopyToClipboard text={this.props.data} onCopy={this._setCopied.bind(this)}>
	      { this.state.copied ? <CopiedButton/> : <CopyButton/> }
	    </CopyToClipboard>
        );
    }
    
};

const CodeTab = ({ react, js, html }) => {
    let panes = [
        {
            menuItem: "React",
            render: () => (
                <Tab.Pane>
                  <SyntaxHighlighter className="highlightfixed" language="jsx">
                    {react}
                  </SyntaxHighlighter>
                  <CopyButtonA data={react} />
                </Tab.Pane>
            )
        },
        {
            menuItem: "Javascript",
            render: () => (
                <Tab.Pane>
                  <SyntaxHighlighter className="highlightfixed" language="html">
                    {js}
                  </SyntaxHighlighter>
                  <CopyButtonA data={js} />
                </Tab.Pane>
            )
        }
    ];
    if (html)
        panes.push({
            menuItem: "HTML",
            render: () => (
                <Tab.Pane>
                  <SyntaxHighlighter className="highlightfixed" language="html">
                    {html}
                  </SyntaxHighlighter>
                  <CopyButtonA data={html} />
                </Tab.Pane>
            )
        });
    return <Tab menu={{ pointing: true }} panes={panes} />;
};
export default CodeTab;
