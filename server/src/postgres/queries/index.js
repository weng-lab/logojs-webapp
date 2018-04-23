let pwm = require('./pwm/index');
let logo = require('./logo/index');

module.exports = dbconn => ({
    pwm: pwm(dbconn),
    logo: logo(dbconn)
});
