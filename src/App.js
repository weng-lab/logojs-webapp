import React, { Component } from 'react';
import './App.css';

import AALogo from './components/logo/aalogo';
import DNALogo from './components/logo/dnalogo';
import RNALogo from './components/logo/rnalogo';
import TestLogo from './components/logo/testlogo';

class App extends Component {
    
    render() {
	return (
	    <div className="App">
		<TestLogo component={AALogo} alphabetSize={22} /><br/>
		<TestLogo component={DNALogo} alphabetSize={4} /><br/>
		<TestLogo component={RNALogo} alphabetSize={4} /><br/>
	    </div>
	);
    }
    
}

export default App;
