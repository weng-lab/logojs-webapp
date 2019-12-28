import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Grid, Modal, Icon } from 'semantic-ui-react';

import { _svgdata } from './utils';

class ImageConverter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dimensions: {
                width: 0,
                height: 0
            },
            file: props.file,
            open: false
        };
        this.canvas = React.createRef();
        this.link = React.createRef();
    }

    showModal() {
        this.setState({
            open: true
        });
    }

    closeModal() {
        this.setState({
            open: false
        });
    }

    updateDimensions() {
        this.setState({
            dimensions: {
                width: this.state.image.width,
                height: this.state.image.height
            }
        });
    }

    doDownload(image, extension) {
        this.canvas.current.width = image.width;
        this.canvas.current.height = image.height;
        const context = this.canvas.current.getContext('2d');
        context.clearRect(0, 0, image.width, image.height);
        context.drawImage(image, 0, 0);
        this.link.current.setAttribute('download', this.props.filename + '.' + extension);
        this.link.current.setAttribute('href', this.canvas.current.toDataURL("image/" + extension).replace("image/" + extension, "image/octet-stream"));
        this.link.current.click();
    }

    download(extension) {
        if (!this.link || !this.link.current || !this.canvas || !this.canvas.current) return;
        const image = new Image();
        image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(_svgdata(ReactDOM.findDOMNode(this.props.svgref)));
        image.onload = () => {
            this.doDownload(image, extension);
        };
    }

    render() {
        return (
            <React.Fragment>
                <Modal open={this.state.open} onClose={this.closeModal.bind(this)} style={{ marginTop: '0px' }}>
                    <Modal.Header><h2>Select a file format:</h2></Modal.Header>
                    <Modal.Content>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={1} />
                                <Grid.Column width={4}>
                                    <Button style={{ fontSize: "26pt" }} onClick={() => this.download("jpeg")}>JPEG</Button>
                                </Grid.Column>
                                <Grid.Column width={1} />
                                <Grid.Column width={4}>
                                    <Button style={{ fontSize: "26pt" }} onClick={() => this.download("png")}>PNG</Button>
                                </Grid.Column>
                                <Grid.Column width={1} />
                                <Grid.Column width={4}>
                                    <Button style={{ fontSize: "26pt" }} onClick={() => this.download("webp")}>WEBP</Button>
                                </Grid.Column>
                                <Grid.Column width={1} />
                            </Grid.Row>
                        </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.closeModal.bind(this)}><Icon className="check" />Done</Button>
                    </Modal.Actions>
                </Modal>
                <span onClick={this.showModal.bind(this)}>
                    {this.props.children}
                </span>
                <div style={{ display: "none" }}>
                    <a ref={this.link} href='/'> </a>
                    <canvas {...this.state.dimensions} ref={this.canvas} />
                </div>
            </React.Fragment>
        );
    }

}
export default ImageConverter;
