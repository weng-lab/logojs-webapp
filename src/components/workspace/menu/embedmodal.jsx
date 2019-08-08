import React from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';

import CodeTab from '../../gallery/codetab';

const EmbedModal = ({ open, onClose, react, js, html }) => (
    <Modal open={open} onClose={onClose} style={{ marginTop: '0px' }}>
      <Modal.Header><h2>Embed this logo</h2></Modal.Header>
      <Modal.Content>
        <CodeTab react={react} js={js} html={html} withcopy/>
      </Modal.Content>
      <Modal.Actions>
	<Button onClick={onClose}><Icon className="check" />Done</Button>
      </Modal.Actions>
    </Modal>
);
export default EmbedModal;
