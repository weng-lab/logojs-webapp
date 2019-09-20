import React from 'react';
import { Tab } from 'semantic-ui-react';

import WorkspacePWMEditor from './pwm';
import WorkspaceFastaEditor from './fasta';

const WorkspaceEditorTabs = ({ logo, onPWMChange, onFastaChange, id }) => {
    if (!logo) return null;
    const panes = [{
        menuItem: "PWM",
        render: () => (
            <div style={{ minHeight: "500px", height: "100%" }}>
              <WorkspacePWMEditor logo={logo} onPWMChange={onPWMChange} />
            </div>
        )
    }];
    if (logo.fasta) panes.push({
        menuItem: "FASTA",
        render: () => (
            <div style={{ minHeight: "500px", height: "100%" }}>
                <WorkspaceFastaEditor logo={logo} id={id && (id.file + "_" + id.motif)} onFastaChange={onFastaChange} />
            </div>
        )
    });
    return <Tab menu={{ secondary: true, pointing: true }} panes={panes} style={{ height: "100%" }} />;
};
export default WorkspaceEditorTabs;
