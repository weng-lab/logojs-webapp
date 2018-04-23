const get = dbconn => (req, res, next) => (
    dbconn.queries.pwm.selectByUuid(req.params.uuid,
				    data => res.status(200).json(data), next)
);

const post = dbconn => (req, res, next) => {
    dbconn.queries.pwm.selectUuidByPwm(req.body, data => (
	res.status(200).json({
	    status: "resource already present",
	    uuid: data.uuid
	})
    ), err => dbconn.queries.pwm.insertReturningUuid(req.body, data => (
	res.status(200).json({
	    status: "resource created",
	    uuid: data.uuid
	}), next
    )))
};

module.exports = dbconn => ({
    get: get(dbconn),
    post: post(dbconn)
});
