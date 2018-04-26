import pwmcontroller from './pwm';
import logocontroller from './logo';

module.exports = dbconn => ({
    pwm: pwmcontroller(dbconn),
    logo: logocontroller(dbconn)
});
