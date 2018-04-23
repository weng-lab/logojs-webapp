let select = require('./select');
let insert = require('./insert');

module.exports = dbconn => Object.assign(
    select(dbconn), insert(dbconn)
);
