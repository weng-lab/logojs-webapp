import React from 'react';
import { Dropdown } from 'semantic-ui-react';

class MotifSelector extends React.Component {

    render() {
        let pwms = this.props.pwms;
        let motifnames = pwms && pwms.result && pwms.result.motifnames;
        if (!motifnames || !motifnames.length) { return null; }
        return (
            motifnames.length > 1 ? (
                <Dropdown text={motifnames[this.props.selectedmotif]}
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
	    ) : (motifnames[this.props.selectedmotif] && <h4>{motifnames[this.props.selectedmotif]}</h4>)
        );
    }
    
}
export default MotifSelector;
