const _format_result = result => ({
    id: result.id,
    typeid: result.typeid,
    isfrequency: result.isfrequency,
    scale: result.scale,
    firstbase: result.firstbase,
    uuid: result.uuid,
    pwm: {
	uuid: result.pwm_uuid,
	pwm: result.pwm
    }
});

const selectByUuid = dbconn => (uuid, success, error) => (
    dbconn.one("SELECT logos.*, pwms.uuid AS pwm_uuid, pwms.pwm AS pwm"
	       + " FROM logos, pwms WHERE logos.uuid = $1 AND logos.pwm = pwms.id", uuid)
	.then(data => success(_format_result(data))).catch(error)
);

export default dbconn => ({
    selectByUuid: selectByUuid(dbconn)
});
