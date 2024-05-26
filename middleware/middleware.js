const jwt = require('jsonwebtoken');
const db = require('../Dbconnection/index')
module.exports = (req, res, next) =>{
    const authHeader = req.get('token');
    if(!authHeader){
        req.isAuth = false;
        return next();
    }

    const token = authHeader.split(' ')[1];
    if(!token || token == ''){
        req.isAuth = false
        return next();
    }
    if(token){
        db.query('select * from access_token where token=?', [token], (error, data) => {
            if(error){
                req.isAuth = false
                return next()
            }else{
                if(data !=''){
                    req.isAuth = true
                    return next()
                }else{
                    req.isAuth = false
                    return next()
                }
            }
        });
    }
}