import React from 'react';
import { Segment } from 'semantic-ui-react';

import Masthead from './masthead';
import EditorLinks from './editorlinks';
import UploadLinks from './uploadlinks';

class Main extends React.Component {

    render() {
	return (
	    <React.Fragment>
	      <Masthead />
	      <Segment className="vertical stripe">
		<EditorLinks /><br /><br /><br />
		<UploadLinks />
	      </Segment>
	    </React.Fragment>
	);
    }
    
};
export default Main;
