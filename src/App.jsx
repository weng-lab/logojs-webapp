import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { HomePage } from './components/homepage';
import { GalleryPage } from './components/gallery';
import { PWMWorkspace, FastaWorkspace, AnyUploadWorkspace } from './components/workspace/index';

class App extends Component {
    
    render() {
	return (
	    <Router>
	      <Switch>
		<Route exact path='/' component={HomePage} />
		<Route path='/editor/pwm' render={() => <PWMWorkspace apiserver={this.props.config.APIURL} />} />
                <Route path='/gallery' render={() => <GalleryPage />} />
 	        <Route path='/editor/fasta' render={() => <FastaWorkspace apiserver={this.props.config.APIURL} />} />
                <Route path='/upload/' render={() => <AnyUploadWorkspace apiserver={this.props.config.APIURL} />} />
	      </Switch>
	    </Router>
	);
    }
    
}

export default App;
