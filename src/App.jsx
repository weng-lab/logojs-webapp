import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { HomePage } from './components/homepage';
import { GalleryPage } from './components/gallery';
import { DNAGallery } from './components/gallery/dna';
import { ProteinGallery } from './components/gallery/protein';
import { ExtendedAlphabetGallery } from './components/gallery/extended';
import { PWMWorkspace, FastaWorkspace, AnyUploadWorkspace } from './components/workspace/index';

class App extends Component {
    
    render() {
	return (
	    <Router basename={process.env.PUBLIC_URL}>
	      <Switch>
		<Route exact path='/' component={HomePage} />
		<Route path='/editor/pwm' render={() => <PWMWorkspace />} />
                <Route path='/gallery' exact render={() => <GalleryPage />} />
 	        <Route path='/editor/fasta' render={() => <FastaWorkspace />} />
                <Route path='/upload/' render={() => <AnyUploadWorkspace />} />
                <Route path='/gallery/dna' exact render={() => <DNAGallery />} />
                <Route path='/gallery/protein' exact render={() => <ProteinGallery />} />
                <Route path='/gallery/extended' exact render={() => <ExtendedAlphabetGallery />} />
	      </Switch>
	    </Router>
	);
    }
    
}

export default App;
