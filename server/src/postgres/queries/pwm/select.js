const selectByUuid = dbconn => (uuid, success, error) => (
    dbconn.one("SELECT * FROM pwms WHERE uuid = $1", uuid)
	.then(success).catch(error)
);

const selectById = dbconn => (id, success, error) => (
    dbconn.one("SELECT * FROM pwms WHERE id = $1", id)
	.then(success).catch(error)
);

const selectUuidByPwm = dbconn => (body, success, error) => (
    dbconn.one("SELECT uuid FROM pwms WHERE pwm = ${pwm}::real[][]", body)
	.then(success).catch(error)
);

const selectIdByPwm = dbconn => (body, success, error) => (
    dbconn.one("SELECT id FROM pwms WHERE pwm = ${pwm}::real[][]", body)
	.then(success).catch(error)
);

export default dbconn => ({
    selectByUuid: selectByUuid(dbconn),
    selectById: selectById(dbconn),
    selectUuidByPwm: selectUuidByPwm(dbconn),
    selectIdByPwm: selectIdByPwm(dbconn)
});
