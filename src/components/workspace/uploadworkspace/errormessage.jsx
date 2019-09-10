import React from 'react';
import { Message, Icon } from 'semantic-ui-react';

class ErrorMessage extends React.Component {

    render() {
        return (
            <Message negative style={{ textAlign: "left", width: "75%" }}>
              <Message.Header>
                We were unable to process some of the files you selected.
              </Message.Header>
              {this.props.errors.map( (error, i) => (
                  <li key={error + "_" + i}><strong>{error.file.name}</strong>: {error.message}</li>
              ))}
              <Icon className="close button" onClick={this.props.onClick} ></Icon>
            </Message>
        );
    }
    
}
export default ErrorMessage;
