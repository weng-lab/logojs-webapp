import React from 'react';
import { Tab } from 'semantic-ui-react';

import WorkspacePPMEditor from './pwm';
import WorkspaceFastaEditor from './fasta';

const WorkspaceEditorTabs = ({ logo, onPPMChange, onFastaChange, id }) => {
    if (!logo) return null;
    const panes = [{
        menuItem: "PPM",
        render: () => (
            <div style={{ minHeight: "500px", height: "100%" }}>
              <WorkspacePPMEditor logo={logo} onPPMChange={onPPMChange} />
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
