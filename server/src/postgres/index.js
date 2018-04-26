import Postgres from 'pg-promise';
import Queries from './queries/index';
import { parse } from 'pg-connection-string';

class DBCONN {

    constructor(cxnstring) {
	this.dbconn = Postgres(null)(parse(cxnstring));
	this.queries = Queries(this.dbconn);
    }
    
};

export default DBCONN;
