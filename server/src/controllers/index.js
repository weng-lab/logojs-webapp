let pwmcontroller = require('./pwm');
let logocontroller = require('./logo');

module.exports = dbconn => ({
    pwm: pwmcontroller(dbconn),
    logo: logocontroller(dbconn)
});
