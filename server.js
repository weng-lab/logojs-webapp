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

app.get('/', (req, res) => {
    res.redirect("/app");
});

app.get('/app/*', (req, res) => {
    req.get({
	...req,
	url: "http://localhost:" + (process.env.REACT_PORT || 5000) + req.path
    }).pipe(res);
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

let react = require('child_process').spawn('serve', [ '-s', 'build', '-l', process.env.REACT_PORT || 5000 ]);
react.on('close', code => {
    process.exit(code);
});
app.listen(process.env.PORT || 8093);
