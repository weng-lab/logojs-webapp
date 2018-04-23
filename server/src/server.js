let Express = require('express');
let BodyParser = require('body-parser');
let Postgres = require('./postgres/index');
let Controllers = require('./controllers/index');

/* configure app to use bodyParser for parsing JSON from POST */
const app = Express();
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
} );

/* establish database connection */
let dbconn = new Postgres.DBCONN("postgres://logos_usr@localhost:5432/logos_to_go", {});
let controllers = Controllers(dbconn);

/* configure routes for the API */
const router = Express.Router();
router.get("/pwm/:uuid", controllers.pwm.get);
router.post("/pwm", controllers.pwm.post);
router.get("/logo/:uuid", controllers.logo.get);
router.post("/logo", controllers.logo.post);

app.use('/api', router);
app.listen( 8000, () => { console.log("server.js$: listening on 8000"); } );
