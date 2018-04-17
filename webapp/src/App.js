import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { PWMWorkspace } from './components/workspace/index';

class App extends Component {
    
    render() {
	return (
	    <div className="App" style={{ height: "100%" }}>
		<PWMWorkspace />
	    </div>
	);
    }
    
}

export default App;
