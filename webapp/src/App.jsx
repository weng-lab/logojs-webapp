import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import CONFIG from './App.config';
import { Main } from './components/main/index';
import { PWMWorkspace, FastaWorkspace } from './components/workspace/index';

class App extends Component {
    
    render() {
	return (
	    <Router>
	      <Switch>
		<Route exact path='/' component={Main} config={CONFIG} />
		<Route path='/editor/pwm' render={() => <PWMWorkspace config={CONFIG} />} />
		<Route path='/editor/fasta' render={() => <FastaWorkspace config={CONFIG} />} />
	      </Switch>
	    </Router>
	);
    }
    
}

export default App;
