const db=require('../Dbconnection/index')
const bcrypt = require('bcryptjs')
const Jwt = require('jsonwebtoken')
const {registerVilidation, vertificationVilidation, loginVilidation} = require('./Vilidation/authvilidation');
const {SendEmail} = require('../mailController/mail')

let register = (req, res) =>{
    let validation=registerVilidation(req.body);
    console.log(registerVilidation(req.body))
    if(Object.keys(validation).length){
        return res.send({status: 0, data: validation});
    }else{
        db.query('SELECT * FROM user WHERE email=?', [req.body.email], (emailerror, checkemail)=>{
            if(emailerror){
                return res.send({status: 0, data: emailerror})
            }else if(checkemail !=''){
                return res.send({status: 0, data: req.body.email+' is already exit'})
            }else{
                db.query('SELECT * FROM user WHERE phone=?', [req.body.phone], (phoneerror, checkphone)=>{
                    if(phoneerror){
                        return res.send({status: 0, data: phoneerror})
                    }else if(checkphone !=''){
                        return res.send({status: 0, data: req.body.phone+' is already exit'})
                    }else{
                        const salt =  bcrypt.genSaltSync(10)
                        const hashedPassword = bcrypt.hashSync(req.body.password, salt)
                        const otp = `${Math.floor(1000 + Math.random() * 9000)}`
                        db.query('INSERT INTO user(name,image,email,phone, address, password, verification) VALUES(?,?,?,?,?,?,?)',[req.body.name, req.body.image, req.body.email, req.body.phone, req.body.address, hashedPassword, otp], (error, data) =>{
                            if(error){
                                return res.send({status: 0, data: error})
                            }else{
                                SendEmail(req.body.email,otp)
                                return res.send({status: 1, data: 'create is successful.'})
                            }
                        })
                    }
                });
            }
        });
    }
};

let login = (req, res) =>{
    let validation=loginVilidation(req.body);
    if(Object.keys(validation).length){
        return res.send({status: 0, data: validation});
    }else{
        db.query('SELECT * FROM user WHERE email=?', [req.body.email], (emailerror, emaildata) =>{
            if(emailerror){
                return res.send({status: 0, data: 'Database connection error.'})
            }else if(emaildata ==''){
                return res.send({status: 0, data: 'Email is not found.'})
            }else{
                if(emaildata[0].status ==0){
                    return res.send({status: 0, data: 'Your account is suppended.'})
                }else{
                    const checkPassword = bcrypt.compareSync(req.body.password, emaildata[0].password)
                    if(!checkPassword) return res.json({status: 0, data: "Wrong password or username!"})
            
                    const {password, ...others} =emaildata[0]
                    const token =Jwt.sign({id: emaildata[0].id}, "secretkey")
                    others.token = token;
                    others.status = 1;
                    db.query('INSERT INTO access_token(token,user_id) VALUES(?,?)',[token,emaildata[0].id], (tokenerror, tokendata) =>{
                        if(tokenerror){
                            return res.send({status: 0, data: 'Database connection error.'})
                        }else{
                            return res.json(others);
                        }
                    })
                }
            }
        })
    }
};

let logout = (req, res) =>{
    db.query('DELETE FROM access_token WHERE token=?',[req.body.token], (tokenerror, tokendata) =>{
        if(tokenerror){
            return res.send({status: 0, data: 'Database connection error.'})
        }else{
            return res.json({status: 1, data: 'logout is successful'});
        }
    })
};

let vertification = (req, res) =>{
    const check=vertificationVilidation(req.query)
    if(Object.keys(check).length){
        return res.send({status: 0, data: check});
    }else{
        db.query('SELECT * FROM user WHERE verification=?',[req.query.code], (error, data) =>{
            if(error){
                return res.send({status: 0, data: 'Database connection error.'})
            }else if(data ==''){
                return res.send({status: 0, data: 'Vertification code is invalid.'})
            }else{
                db.query('UPDATE user SET status=1 WHERE verification=?', [req.query.code], (updateerror, updatedata) =>{
                    if(updateerror){
                        return res.send({status: 0, data: 'Database connection error.'})
                    }else{
                        return res.send({status: 1, data: 'Update vertification code is successful.'})
                    }
                })
            }
        })
    }
}
module.exports = {
    register,
    login,
    logout,
    vertification
}