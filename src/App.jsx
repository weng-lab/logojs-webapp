import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { Main } from './components/main/index';
import { PWMWorkspace, FastaWorkspace, MEMEWorkspace,
         JASPARWorkspace, TRANSFACWorkspace } from './components/workspace/index';

class App extends Component {
    
    render() {
	return (
	    <Router>
	      <Switch>
		<Route exact path='/' component={Main} />
		<Route path='/editor/pwm' render={() => <PWMWorkspace apiserver={this.props.apiserver} />} />
 	        <Route path='/editor/fasta' render={() => <FastaWorkspace apiserver={this.props.apiserver} />} />
 	        <Route path='/editor/meme' render={() => <MEMEWorkspace apiserver={this.props.apiserver} />} />
                <Route path='/editor/jaspar' render={() => <JASPARWorkspace apiserver={this.props.apiserver} />} />
                <Route path='/editor/transfac' render={() => <TRANSFACWorkspace apiserver={this.props.apiserver} />} />
	      </Switch>
	    </Router>
	);
    }
    
}

export default App;
