let Postgres = require('pg-promise');
let Queries = require('./queries/index');

class DBCONN {

    constructor(host, options) {
	this.dbconn = Postgres(options)(host);
	this.queries = Queries(this.dbconn);
    }
    
};

module.exports = {
    DBCONN: DBCONN
};
