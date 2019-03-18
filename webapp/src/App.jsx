import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { Main } from './components/main/index';
import { PWMWorkspace, FastaWorkspace, MEMEWorkspace,
         JASPARWorkspace, TRANSFACWorkspace, FASTAUploadWorkspace } from './components/workspace/index';

class App extends Component {
    
    render() {
	return (
	    <Router>
	      <Switch>
		<Route exact path='/' component={Main} />
		<Route path='/editor/pwm' render={() => <PWMWorkspace apiserver={this.props.config.APIURL} />} />
 	        <Route path='/editor/fasta' render={() => <FastaWorkspace apiserver={this.props.config.APIURL} />} />
 	        <Route path='/editor/meme' render={() => <MEMEWorkspace apiserver={this.props.config.APIURL} />} />
                <Route path='/editor/jaspar' render={() => <JASPARWorkspace apiserver={this.props.config.APIURL} />} />
                <Route path='/editor/transfac' render={() => <TRANSFACWorkspace apiserver={this.props.config.APIURL} />} />
		<Route path='/editor/fastaupload' render={() => <FASTAUploadWorkspace apiserver={this.props.config.APIURL} />} />
	      </Switch>
	    </Router>
	);
    }
    
}

export default App;
