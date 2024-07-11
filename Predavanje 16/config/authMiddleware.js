const JWTData = require('./JWT_SECRET');
const jwt = require('jsonwebtoken');


//Middleware za autentifikaciju (da li korisnik postoji) 
const authenticate = (req, res, next) =>{
    const authData = req.header('Authorization');
    if(authData == undefined)
    {
        return res.status(400).send('Token is not present');
    }
    const pocetniToken = req.header('Authorization');
    const token = req.header('Authorization').replace('Bearer ', '');

    try
    {
        const decoded = jwt.verify(token,JWTData.JWT_SECRET);
        req.userId = decoded.userId;
        req.userRole = decoded.role;
        next();
    }
    catch(err)
    {
        res.status(401).send('Unauthorized');
    }

}

const authorizedAdmin = (req, res, next) =>
{
    if(req.userRole !== 'admin')
    {
        return res.status(403).send('Forbidden');
    }
    next();

}

module.exports = {authenticate, authorizedAdmin};