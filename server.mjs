//server.mjs 

//imports
import express from 'express';
import Database from 'better-sqlite3';

const PORT = 3000
const app = express();
const db = new Database('placestostay.db')

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



//
console.log("Web Application Listening at http://localhost:3000")
app.listen(PORT);