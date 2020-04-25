const path = require('path');
const express = require('express');
const app = express();

var db = require('./database');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use('/api/cities', require('./api/cities')) ;
app.use('/api/weather', require('./api/weather'));
app.listen(PORT,()=>{
    console.log('server is up!');
});
db.query('SELECT now()', (err,res)=>{
    if(err.error) return console.log(err.stack);
    console.log('PostgreSQL is connected ', res[0].now);
})
module.exports = app;