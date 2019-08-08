import React from 'react';
import { Tab } from 'semantic-ui-react';

import SyntaxHighlighter from './syntax';

const CodeTab = ({ react, js, html }) => {
    let panes = [
        {
            menuItem: "React",
            render: () => (
                <Tab.Pane>
                  <SyntaxHighlighter language="jsx">
                    {react}
                  </SyntaxHighlighter>
                </Tab.Pane>
            )
        },
        {
            menuItem: "Javascript",
            render: () => (
                <Tab.Pane>
                  <SyntaxHighlighter language="jsx">
                    {js}
                  </SyntaxHighlighter>
                </Tab.Pane>
            )
        }
    ];
    if (html)
        panes.push({
            menuItem: "HTML",
            render: () => (
                <Tab.Pane>
                  <SyntaxHighlighter language="html">
                    {html}
                  </SyntaxHighlighter>
                </Tab.Pane>
            )
        });
    return <Tab menu={{ pointing: true }} panes={panes} />;
};
export default CodeTab;
