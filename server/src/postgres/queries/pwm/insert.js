const insertReturningUuid = dbconn => (body, success, error) => (
    dbconn.one("INSERT INTO pwms (uuid, pwm) VALUES (uuid_generate_v4(), ${pwm}) RETURNING uuid", body)
	.then(success).catch(error)
);

const insertReturningId = dbconn => (body, success, error) => (
    dbconn.one("INSERT INTO pwms (uuid, pwm) VALUES (uuid_generate_v4(), ${pwm}) RETURNING id", body)
	.then(success).catch(error)
);

export default dbconn => ({
    insertReturningUuid: insertReturningUuid(dbconn),
    insertReturningId: insertReturningId(dbconn)
});
