//server.mjs 

//imports
import express from 'express';
import Database from 'better-sqlite3';

const PORT = 3000
const app = express();
const db = new Database('placestostay.db')

//home route - should render the index page for later on 
app.get('/', (req,res)=> {
    res.send('Test');
});

//testing for database connection
app.get('/test',(req,res)=>{
    try{
        const smth = db.prepare(`SELECT * FROM accommodation`);
        const results = smth.all(req.params)
        res.json(results)
    }catch(error){
        res.status(500).json({error:error})
    }
});

//Task 1 - Look up all accommodation in a given location.
app.get('/placestostay/accommodation/:location', (req,res) => {
    try{
        const smth = db.prepare(`SELECT * FROM accommodation WHERE location=? `)
        const results = smth.all(req.params.location)
        res.json(results)
    }catch(error){
        res.status(500).json({error:error})
    }
});

//Task 2 - Look up all accommodation of a given type in a given location.
app.get('/placestostay/accommodation/:location/type/:type',(req,res) => {
    try{
        const smth = db.prepare(`SELECT * FROM accommodation WHERE location=? AND type=?`)
        const results = smth.all(req.params.location,req.params.type)
        res.json(results)
    }catch(error){
        res.status(500).json({error:error})
    }
});

//Task 3 -Book a place of accommodation for a given number of people on a given date.


console.log("Web Application Listening at http://localhost:3000")
app.listen(PORT);