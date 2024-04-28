//app.mjs 

//imports
import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';

//variables
const PORT = 3000;
const app = express();
const db = new Database('placestostay.db');

// middleware functions
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('public'));


//home route - should render the index page for later on 
app.get('/', (req, res) => {
    res.send('HomePageTest');
});

//testing for database connection
app.get('/test', (req, res) => {
    try {
        const smth = db.prepare(`SELECT * FROM accommodation`);
        const results = smth.all(req.params)
        res.json(results)
    } catch (error) {
        res.status(500).json({ error: error })
    }
});

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
        if (req.body.accID == "" || req.body.thedate == "" || req.body.username == ""|| req.body.npeople == "") {
            res.status(400).json({ error: "One or more of your fields are blank" });
        } else {
            //adding record to acc_bookings
            const createBooking = db.prepare(`INSERT INTO acc_bookings(accID,thedate,username,npeople) VALUES (?,?,?,?) `) //the username should be in the body - focus on tis later on 
            const bookingResults = createBooking.run(req.body.accID, req.body.thedate, req.body.username, req.body.npeople)
            //reducing the availability acc_dates
            const reduceAvailability = db.prepare(`UPDATE acc_dates SET availability=availability-1 WHERE accID=? AND username=? `)
            const availabilityResults = reduceAvailability.run(req.body.accID,req.body.username);
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
