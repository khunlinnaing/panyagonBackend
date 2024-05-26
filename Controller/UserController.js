const db=require('../Dbconnection/index')
const UserList= (req, res) =>{
    if(!req.isAuth){
        return res.send({status: 0, data: 'Please login your account'})
    }else{
        db.query('SELECT * FROM user',(error, data)=>{
            if(error){
                return res.send({status: 0, data: 'Database Connection error'})
            }else{
                return res.send({status: 1, data: data})
            }
        });
    }
}

const UserDetail= (req, res) =>{
    if(!req.isAuth){
        return res.send({status: 0, data: 'Please login your account'})
    }else if(req.query.id ==''){
        return res.send({status: 0, data: 'Please enter id'})
    }else{
        db.query('SELECT * FROM user WHERE id=?',[req.query.id],(error, data)=>{
            if(error){
                return res.send({status: 0, data: 'Database Connection error'})
            }else if(data ==''){
                return res.send({status: 0, data: 'ID is not found.'})
            }else{
                const {password,...datas} = data[0];
                datas.status=1
                return res.send(datas)
            }
        })
    }
}

const UserUpdate= (req, res) =>{
    if(!req.isAuth){
        return res.send({status: 0, data: 'Please login your account'})
    }else if(req.body.id ==''){
        return res.send({status: 0, data: 'Please enter id'})
    }else{
        db.query('SELECT * FROM user WHERE id=?',[req.body.id],(error, data)=>{
            if(error){
                return res.send({status: 0, data: 'Database Connection error'})
            }else if(data ==''){
                return res.send({status: 0, data: 'ID is not found.'})
            }else{
                db.query('SELECT * FROM user',(allerror, alldata)=>{
                    if(allerror){
                        return res.send({status: 0, data: 'Database Connection error'})
                    }else{
                        console.log(alldata)
                    }
                })
            }
        })
    }
}

const UserDelete= (req, res) =>{
    if(!req.isAuth){
        return res.send({status: 0, data: 'Please login your account'})
    }else if(req.query.id ==''){
        return res.send({status: 0, data: 'Please enter id'})
    }else{
        db.query('Select * from user where id=?',[req.query.id], (error, data)=>{
            if(error){
                return res.send({status: 0, data: 'Database Connection error'})
            }else if(data ==''){
                return res.send({status: 0, data: 'ID not found'})
            }else{
                db.query('DELETE FROM user WHERE id=?',[req.query.id], (error1, data1)=>{
                    if(error1){
                        return res.send({status: 0, data: 'Database Connection error'})
                    }else{
                        db.query('DELETE FROM access_token WHERE user_id=?',[req.query.id], (error2, data)=>{
                            if(error2){
                                return res.send({status: 0, data: 'Database Connection error'})
                            }else{
                                return res.send({status: 1, data: 'Delete is success'})
                            }
                        })
                    }
                })
            }
        });
    }
}

module.exports= {
    UserList, 
    UserDetail, 
    UserUpdate,
    UserDelete
}