import React from 'react';
import { Segment, Container, Header } from 'semantic-ui-react';

import { MainMenu, mainMenuItems } from '../../homepage';
import UploadWorkspace from './uploadworkspace';
import { parseMeme, parseFasta, parseJaspar, parseTransfac } from './parsers';

class AnyUploadWorkspace extends React.Component {
    
    render() {
        const parsers = [
            parseMeme,
            parseTransfac,
            parseJaspar,
            parseFasta
        ];
        return (
            <React.Fragment>
              <Segment inverted fixed="top" attached="top">
                <Container>
                  <MainMenu items={mainMenuItems.items} active="Data Upload" fixed={true} />
                </Container>
                <Container style={{ textAlign: "center" }}>
                  <Header as="h1" inverted style={{ fontSize: "2.5em", marginTop: "0.15em" }}>
                    Create Logos
                  </Header>
                </Container>
              </Segment>
              <UploadWorkspace parse={parsers.map(x => x.bind(this))}
                               title="MEME, Transfac, JASPAR, or FASTA" />
            </React.Fragment>
        );
    }
    
}
export default AnyUploadWorkspace;
