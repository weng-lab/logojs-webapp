## LogosJ webapp

This repository contains the LogosJ webapp, a small React-based web application for creating sequence logos from PWMs, FASTA sequences, or
motifs in common formats including MEME, JASPAR, and TRANSFAC. You can either edit PWMs or FASTA sequences and watch logos update in real time,
or upload files in FASTA, MEME, JASPAR, or TRANSFAC format and produce logos. The logos you generate may be saved in SVG format, shared via permalink,
or embedded in other web applications. If you want to embed dynamically-generated logos, for example using data fetched from a database, see the LogosJ
Javascript package (https://www.github.com/weng-lab/logosj-package). This web application is publicly available at https://logosj.wenglab.org.

### Running the application locally
You must have node.js and Yarn installed to run this application. Then, simply do:

```sh
git clone https://www.github.com/weng-lab/logosj-webapp
cd logosj-webapp
yarn
scripts/build-local.sh
node server.js
```

and you will be able to access the web application at the default URL of http://localhost:8093, with support for all the application's functionality
(logo editing, data uploading, logo downloads, and permalink generation and sharing). If you deploy the application at a publicly accessible URL, you
will be able to use it share permalinks you generate with others.

### Development
Changes to the codebase are welcome via pull request. To run the development server, do the following:

```sh
git clone https://www.github.com/weng-lab/logosj-webapp
cd logosj-webapp
yarn
yarn start
```

which will start the application at http://localhost:3000. The application will automatically refresh when you make code changes. The development server
does not support permalink generation and sharing; you should deploy the full application by running

```sh
scripts/build-local.sh
node server.js
```

when you have completed your changes.

### Running as a Docker container
The LogosJ webapp is Docker-ready. To build the container, do

```sh
docker build -t logosj-webapp .
```

within the project root directory. When the container is run, it will expose the fully-functional application on its port 8093.
