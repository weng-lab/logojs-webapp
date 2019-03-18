## Logos-to-Go webapp

This repository contains the Logos-to-Go webapp, a small React-based web application for creating sequence logos from PWMs, FASTA sequences, or
motifs in common formats including MEME, JASPAR, and TRANSFAC. You can either edit PWMs or FASTA sequences and watch logos update in real time,
or upload files in FASTA, MEME, JASPAR, or TRANSFAC format and produce logos. The logos you generate may be saved in SVG format. When the web
application is connected to the associated RESTful API server (https://www.github.com/weng-lab/logos-to-go-server) the web application allows
you to generate permalinks to the logos you generate so that you can share them or embed them statically in your own web applications. If you
want to embed dynamically-generated logos, see the Logos-to-Go Javascript and React packages (https://www.github.com/weng-lab/logos-to-go-package)
instead. This web application is publicly available at https://logos.wenglab.org and is connected to a public RESTful API.

### Running the application locally
You must have node.js and Yarn installed to run this application. Then, simply do:

```sh
git clone https://www.github.com/weng-lab/logos-to-go-webapp
cd logos-to-go-webapp
yarn
scripts/run-local.sh
```

and you will be able to access the web application at http://127.0.0.1:3000. By default, this will run the application without an associated
RESTful API; you will be able to create logos in all the formats described above and save them as SVG, but not generate permalinks to them.

### Running locally with a RESTful API
You may run a local instance of the Logos-to-Go RESTful API and pair it with the web application. To do so, first install the RESTful API server
using the instructions at https://www.github.com/weng-lab/logos-to-go-server. If you are deploying the RESTful API locally on port 8000 and do not
wish to expose the application outside your local machine, you may simply run the application as described above. If you are exposing the server
at another URL, copy the configuration file at `config/config.local.json` to `config/config.your-config-name.json` and edit it appropriately:

```json
{
    "APIURL": "https://your-api-url.example.com"
}
```

Then pass your configuration file's name to `scripts/run-local.sh` when you are deploying the web application:

```sh
scripts/run-local.sh your-config-name
```

and the web application will be linked with your local server.
