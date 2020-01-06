import React from 'react';
import { Modal, Button, Header, Form, TextArea, Message, Icon } from 'semantic-ui-react';

import { parseMeme, parseFasta, parseJaspar, parseTransfac, parseTSV } from './parsers';

const parsers = [ parseMeme, parseTSV, parseFasta, parseJaspar, parseTransfac ];

class PasteModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            logos: null
        };
    }

    textUpdated(e) {

        if (e.target.value.trim() === "") {
            this.setState({ logos: null });
            return;
        }

        let result, i = 0;
        const value = e.target.value + '\n'; // some formats require a training new line to parse correctly
        while ((!result || !result.logos || !result.logos.length) && parsers[i]) {
            result = (parsers[i++])(value);
        }

        if (Object.keys(result.logos).length !== 0)
            this.setState({
                logos: result.logos
            });
        else
            this.setState({
                logos: []
            });

    }

    render() {
        return (
            <Modal
              style={{ marginTop: '0px' }}
              open={this.props.open}
              onClose={this.props.onClose.bind(this)}>
        	    <Modal.Header><h2>Paste Motif Data</h2></Modal.Header>
        	    <Modal.Content>
        	        <Header as='h4'>
        	            You can paste data in FASTA, MEME, TRANSFAC, or JASPAR format. If you paste MEME format data
        	            without an alphabet definition line, it must have either four columns (DNA) or 20 or 22 columns
        	            (protein).
        	        </Header>
        	        {this.state.logos !== null && (
        	            this.state.logos.length > 0 ? (
        	                <Message positive>
        	                    <Header as="h3">
        	                        Found {this.state.logos.length} logo{this.state.logos.length !== 1 && 's'}
        	                    </Header>
        	                </Message>
        	            ) : (
        	                <Message negative>
        	                    <Header as="h3">We didn't find any logos in the pasted input.</Header>
        	                    Check that the format is valid and try again. If you think this is an error, open an
        	                    issue on our <a href="https://www.github.com/weng-lab/logojs-webapp">GitHub</a>.
        	                </Message>
        	            )
        	        )}
            	    <Form>
            	        <TextArea rows={15} onChange={this.textUpdated.bind(this)} />
            	    </Form>
                </Modal.Content>
        	    <Modal.Actions>
        	        <Button onClick={() => this.props.onClose(this.state.logos)}><Icon className="check" />Done</Button>
        	        <Button onClick={() => this.props.onClose(null)}><Icon className="cancel" />Cancel</Button>
        	    </Modal.Actions>
        	</Modal>
        );
    }

};
export default PasteModal;
