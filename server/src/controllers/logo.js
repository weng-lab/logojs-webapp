import rdserver from 'react-dom/server';
import { DNALogo, RNALogo, AALogo, FREQUENCY, INFORMATION_CONTENT } from 'logos-to-go-react';

const LogoComponent = [
    DNALogo, RNALogo, AALogo
];

let _render_svg = data => rdserver.renderToString(LogoComponent[data.typeid]({
    startpos: data.firstbase,
    mode: data.isfrequency ? FREQUENCY : INFORMATION_CONTENT,
    pwm: data.pwm.pwm,
    scale: data.scale
})).replace(/[<]svg/g, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"');

const get = dbconn => (req, res, next) => (
    dbconn.queries.logo.selectByUuid(
	req.params.uuid,
	data => (req.query.format === 'json'
		 ? res.status(200).json(data)
		 : res.set("Content-Type", "image/svg+xml") && res.status(200).send(_render_svg(data))),
	next
    )
);

const post = dbconn => (req, res, next) => {
    let doinsert = data => (
	dbconn.queries.logo.insert(
	    Object.assign(req.body, { pwm: data.id }), data => res.status(200).json(data), next
	)
    );
    dbconn.queries.pwm.selectIdByPwm(req.body, doinsert, err => (
	dbconn.queries.pwm.insertReturningId(req.body, doinsert, next)
    ));
};

export default dbconn => ({
    get: get(dbconn),
    post: post(dbconn)
});
