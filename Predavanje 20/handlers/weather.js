//const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config({path : path.join(__dirname, '../.env')});


// let localCache = null;
// let cacheTime = null;

/*
{
    'Belgrade' : 
    {
        localCache : 'podaci o vremenu';
        cacheTime : 'vreme dobijanje podataka', // kes postoji 30 min 13:52:00 => 13:52:00
    },
    'London' : 
    {
        localCache : 'podaci o vremenu';
        cacheTime : 'vreme dobijanje podataka',
    },

}


Objasnjenje :
cache[req.params.city].cacheTime + (60 * 1000) < new Date().getTime()

    13:01 + 10min < 13:03
*/
//Cache pocetak
let cache = {};

//Handler
const getCity = async (req, res) => 
    {
        //let key = '';
        let key = process.env.API_KEY;
                 //http://api.weatherapi.com/v1/current.json?key=7842fc3b16f244b59eb74254242407&q=London&aqi=no
        let url = `http://api.weatherapi.com/v1/current.json?q=${req.params.city}&key=${key}&aqi=no`;

        if(
            cache[req.params.city]
            && cache[req.params.city].cacheTime !== null
            && cache[req.params.city].cacheTime + (60 * 1000) < new Date().getTime()
        )
        {
            //Izbrisao sam kes za dati grad
            cache[req.params.city].localCache = null;
        }

        if(!cache[req.params.city] || cache[req.params.city].localCache === null)
            {
                //Ukoliko smo izbrisali kes pravimo novi
                let data = await fetch(url);
                cache[req.params.city] = 
                {
                    localCache : await data.json(),
                    cacheTime : new Date().getTime()
                };

            }
            //Vracamo kes vrednost
            return res.send(cache[req.params.city].localCache);

    }

    module.exports = {getCity};