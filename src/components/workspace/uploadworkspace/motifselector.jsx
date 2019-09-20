import React from 'react';
import { Dropdown } from 'semantic-ui-react';

class MotifSelector extends React.Component {

    render() {
        let ppms = this.props.ppms;
        let motifnames = ppms && ppms.map && ppms.map( x => x.name );
        if (!motifnames || !motifnames.length) { return null; }
        return (
            motifnames.length > 1 ? (
                <Dropdown text={this.props.selectedmotif.name}
			  floating labeled button>
		  <Dropdown.Menu>
		    <Dropdown.Menu scrolling>
                      {motifnames.map( (name, i) => (
			  <Dropdown.Item key={"motif_" + name + '_' + i}
                                         onClick={ () => this.props.onItemSelected(i) }
                                         active={i === this.props.selected}>
			    {name}
			  </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
		  </Dropdown.Menu>
		</Dropdown>
	    ) : (this.props.selectedmotif.name ? <h4>{this.props.selectedmotif.name}</h4> : null)
        );
    }
    
}
export default MotifSelector;
