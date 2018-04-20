import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { Main } from './components/main/index';
import { PWMWorkspace, FastaWorkspace } from './components/workspace/index';

class App extends Component {
    
    render() {
	return (
	    <Router>
	      <Switch>
		<Route exact path='/' component={Main} />
		<Route path='/editor/pwm' component={PWMWorkspace} />
		<Route path='/editor/fasta' component={FastaWorkspace} />
	      </Switch>
	    </Router>
	);
    }
    
}

export default App;
