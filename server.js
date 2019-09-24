const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const hsts = require('hsts');

const logos = require('logosj-react');
const ReactDOMServer = require('react-dom/server');
const React = require('react');

let alphabet = {};
logos.CompleteAlphabet.forEach( x => {
    alphabet[x.regex] = x.component
});

const app = express();

const decodeSvg = j => {
    if (!j) return {};
    const decoded = (new Buffer(j, "base64")).toString("ascii");
    return JSON.parse(decoded);
};

app.use(compression());
app.use(hsts({ maxAge: 15552000 }));
app.use('/app', express.static(path.join(__dirname, 'build')));
app.use('/app/gallery', express.static(path.join(__dirname, 'build')));
app.use('/app/create', express.static(path.join(__dirname, 'build')));
app.use('/app/gallery/*', express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.redirect("/app");
});

const lookupComponent = glyph => {
    let nglyph = {
	...glyph,
	component: []
    };
    for (let i = 0; i < glyph.regex.length; ++i) {
	nglyph.component.push(alphabet[glyph.regex[i]]);
    }
    return nglyph;
};

app.get('/healthz', (req, res) => {
    res.status(200).send("healthy\n");
});

const hasNegatives = values => {
    let r = false;
    values.forEach( row => {
	row.forEach( x => {
	    if (x < 0) r = true;
	});
    });
    return r;
};

app.get('/svg/:s', (req, res) => {

    const logo = decodeSvg(req.params.s);
    logo.alphabet = (logo.alphabet.raw || logo.alphabet).map(lookupComponent);
    
    res.setHeader('Content-Type', 'image/svg+xml');

    const values = logo.values || logo.ppm;
    if (values && values.forEach)
	if (hasNegatives(values))
	    return res.status(200).send(
		ReactDOMServer.renderToStaticMarkup(
		    React.createElement(
			logos.LogoWithNegatives,
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

app.listen(process.env.PORT || 8094);
