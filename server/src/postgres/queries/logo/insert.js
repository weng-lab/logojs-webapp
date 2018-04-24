const insert = dbconn => (body, success, error) => (
    dbconn.one("INSERT INTO logos (uuid, pwm, typeid, isfrequency, scale, firstbase) "
               + "VALUES (uuid_generate_v4(), ${pwm}, ${typeid}, ${isfreq}, ${scale}, ${firstbase}) "
               + "RETURNING uuid", body).then(success).catch(error)
);

export default dbconn => ({
    insert: insert(dbconn)
});
