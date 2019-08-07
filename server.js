const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const logos = require('logos-to-go-react');
const ReactDOMServer = require('react-dom/server');
const React = require('react');

let glyphmap = {};
logos.CompleteGlyphmap.forEach( x => {
    glyphmap[x.regex] = x.component
});

const app = express();

const decodeSvg = j => {
    if (!j) return {};
    const decoded = (new Buffer(j, "base64")).toString("ascii");
    return JSON.parse(decoded);
};

app.use('/app', express.static(path.join(__dirname, 'build')));

app.get('/app/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const lookupComponent = glyph => {
    let nglyph = {
	...glyph,
	component: []
    };
    for (let i = 0; i < glyph.regex.length; ++i) {
	nglyph.component.push(glyphmap[glyph.regex[i]]);
    }
    return nglyph;
};

app.get('/svg/:s', (req, res) => {

    const logo = decodeSvg(req.params.s);
    logo.glyphmap = (logo.glyphmap.raw || logo.glyphmap).map(lookupComponent);
    
    res.setHeader('Content-Type', 'image/svg+xml');
    return res.status(200).send(
	ReactDOMServer.renderToStaticMarkup(
	    React.createElement(
		logos.Logo,
		logo
	    )
	).replace(
	    /svg/, 'svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"'
	).replace(
  	    /width="1"/, ''
	).replace(
  	    /height="1"/, ''
	)
    );
    
});

app.listen(process.env.PORT || 8088);
