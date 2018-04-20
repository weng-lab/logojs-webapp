import React from 'react';

import Masthead from './masthead';
import EditorLinks from './editorlinks';

class Main extends React.Component {

    render() {
	return (
	    <React.Fragment>
	      <Masthead/>
	      <EditorLinks/>
	    </React.Fragment>
	);
    }
    
};
export default Main;
