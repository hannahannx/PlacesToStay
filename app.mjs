//app.mjs 

//imports
import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';
import expressSession from 'express-session';
import betterSqlite3Session from 'express-session-better-sqlite3';

//variables
const PORT = 3000;
const app = express();
const db = new Database('placestostay.db');
//database to store sessions 
const sessDb = new Database('session.db');
//object for session store
const SqliteStore = betterSqlite3Session(expressSession, sessDb);

// middleware functions
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('public'));

app.use(expressSession({
    store: new SqliteStore(),
    secret: 'absoluteT5',
    resave: true,
    saveUninitialized: false,
    rolling: true,
    unset: 'destroy',
    proxy: true,
    cookie: {
        maxAge: 60000,
        httpOnly: false
    }
}));

// Login route
app.post('/login', (req, res) => {
    if (req.body.username == "" || req.body.password == "" ) {
        res.status(400).json({ error: "One or more of your fields are blank" });
    }else{
      try{
        const smth = db.prepare(`SELECT * FROM acc_users WHERE username=? AND password=?`)
        const results = smth.all(req.body.username,req.body.password);
        if (results.length == 1){
            req.session.username = req.body.username;
            console.log(req.session.username)
            const loginStatus = `Sucessfully logged in as ${req.session.username}`
            res.send(loginStatus)
            console.log(loginStatus)
        }else{
            res.status(400).json({error: "Incorrect login combination"});
        }
    }catch(e){
        res.status(500).json({ error: error })
    }    
    }
    
});

// Logout route
app.post('/logout', (req, res) => {
    req.session = null;
    res.json({'success': 1 });
});

// 'GET' login route - useful for clients to obtain currently logged in user
app.get('/login', (req, res) => {
    if(req.session.user){
        res.send({username: req.session.username || null});
}});

//Task 1 - Look up all accommodation in a given location.
app.get('/placestostay/accommodation/:location', (req, res) => {
    try {
        const smth = db.prepare(`SELECT * FROM accommodation WHERE location=? `)
        const results = smth.all(req.params.location)
        res.json(results)
    } catch (error) {
        res.status(500).json({ error: error })
    }
});

//Task 2 - Look up all accommodation of a given type in a given location.
app.get('/placestostay/accommodation/:location/type/:type', (req, res) => {
    try {
        const smth = db.prepare(`SELECT * FROM accommodation WHERE location=? AND type=?`)
        const results = smth.all(req.params.location, req.params.type)
        res.json(results)
    } catch (error) {
        res.status(500).json({ error: error })
    }
});

//Task 3 -Book a place of accommodation for a given number of people on a given date.
app.post('/placestostay/accommodation/book', (req, res) => {
    try {
        //checking if any of the fields are blank 
        if (req.body.accID == (""||0) || req.body.thedate == "" || req.body.username == ""|| req.body.npeople == "") {
            res.status(400).json({ error: "One or more of your fields are blank" });
        } else {
            //adding record to acc_bookings
            const createBooking = db.prepare(`INSERT INTO acc_bookings(accID,thedate,username,npeople) VALUES (?,?,?,?) `)
            const bookingResults = createBooking.run(req.body.accID, req.body.thedate, req.body.username, req.body.npeople)
            //reducing the availability acc_dates
            const reduceAvailability = db.prepare(`UPDATE acc_dates SET availability=availability-1 WHERE accID=? AND thedate=? `)
            const availabilityResults = reduceAvailability.run(req.body.accID,req.body.thedate);
            if (availabilityResults.changes == 1) {
                res.json({ id: bookingResults.lastInsertRowId });
            } else {
                res.status(404).json({ error: "No accommodation with that ID" });
            }
        }
        //JSON
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

console.log("Web Application Listening at http://localhost:3000")
app.listen(PORT);
