const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const decodeSvg = j => {
    if (!j) return {};
    const decoded = (new Buffer(j, "base64")).toString("ascii");
    return JSON.parse(decoded);
};

app.use('/', express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/svg/:s', (req, res) => {
    
    const logos = require('logos-to-go-react');
    const ReactDOMServer = require('react-dom/server');
    const React = require('react');
    
    res.setHeader('Content-Type', 'image/svg+xml');
    return res.status(200).send(
	ReactDOMServer.renderToStaticMarkup(
	    React.createElement(
		logos.Logo,
		decodeSvg(req.params.s)
	    )
	).replace(
	    /svg/, 'svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"'
	).replace(
  	    /width="1"/, ''
	)
    );
    
});

app.listen(process.env.PORT || 8084);
