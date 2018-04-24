import Postgres from 'pg-promise';
import Queries from './queries/index';

class DBCONN {

    constructor(host, options) {
	this.dbconn = Postgres(options)(host);
	this.queries = Queries(this.dbconn);
    }
    
};

export default DBCONN;
