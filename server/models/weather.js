var request = require('request-promise');
const API_KEY = "635af466065253c21a4867fc10923410";

class Weather{
    static retrieveByCity(city, cb){
        request({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=imperial`,
            json: true
        }).then((res)=>{
            cb(res);
        }).catch((err)=>{
            console.log(err);
            cb({error: 'Could not reach OpenWeatherMapApi'})
        })
    }
}

module.exports = Weather;