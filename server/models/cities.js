const db = require('../database');

class Cities{
    static retrieveAll(cb){
        db.query('SELECT city from cities',(err,res)=>{
            if(err.error) return cb(err);
            cb(res);
        });
    }
    static insert(city, cb){
        db.query('INSERT INTO cities (city) VALUES($1) ', [city],(err,res)=>{
            if(err.error) return cb(err);
            cb(res); 
        })
    }
}

module.exports =  Cities;
