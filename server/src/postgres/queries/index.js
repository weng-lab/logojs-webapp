import pwm from './pwm/index';
import logo from './logo/index';

export default dbconn => ({
    pwm: pwm(dbconn),
    logo: logo(dbconn)
});
