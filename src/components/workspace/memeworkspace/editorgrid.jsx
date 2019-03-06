import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Logo } from 'logos-to-go-react';

import MEMELogoMenu from './menu';
import { PWMEditor } from '../../editor/index';

class MEMEEditorGrid extends React.Component {

    render() {
        return (
	    <Grid style={{ height: '100%' }}>
	      <Grid.Row style={{ height: '40%' }}>
		<Grid.Column width={16}>
		  <PWMEditor
		    height="100%" width="100%"
		    text={this.state.pwm.text}
		    onChange={this._pwmChange.bind(this)} />
		</Grid.Column>
	      </Grid.Row>
	      <Grid.Row style={{ height: '60%' }}>
		<Grid.Column width={16} style={{ height: "100%" }}>
		  <MEMELogoMenu svgref={this.logo} apiurl={this.logoPostUrl}
				logoinfo={this._format_logoinfo(this.state)} />
		  <div ref={ c => { this.logo = c; } }
                       style={{ height: "75%" }}>
		    <Logo pwm={this.state.pwm.parsed}
			  startpos={this.state.startpos}
			  mode={this.state.mode}
			  glyphmap={this.state.glyphmap} />
		  </div>
		</Grid.Column>
	      </Grid.Row>
	    </Grid>
        );
    }
    
}
export default MEMEEditorGrid;
