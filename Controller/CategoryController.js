const db = require('../Dbconnection/index')
const { CategoryPostVilidation } = require('./Vilidation/CategoryVilidation')

const CreateCategory = (req, res) => {
    let checkCategory = CategoryPostVilidation(req.body);
    if (Object.keys(checkCategory).length) {
        return res.send({ status: 0, data: checkCategory });
    } else {
        db.query('SELECT  u.id as userId, u.name, u.image, u.email, u.phone, u.address, ul.level_name, ul.value FROM user as u JOIN user_level as ul ON u.user_level_id = ul.id WHERE u.id=?', [req.body.user_id], (err, data) => {
            if (err) {
                return res.send({ status: 0, data: 'Database Connection error' })
            } else {
                if (data == '') {
                    return res.send({ status: 0, data: 'Id Not Found' })
                } else {
                    if (data[0].value > 2) {
                        return res.send({ status: 0, data: 'Admin or Manager only can create category'})
                    } else {
                        db.query('SELECT * FROM category WHERE name=?', [req.body.name], (error1, data1)=>{
                            if(error1){
                                return res.send({ status: 0, data: 'Database Connection error' })
                            }else{
                                if(data1 !=''){
                                    return res.send({ status: 0, data: `${req.body.name} is already exits.` })
                                }else{
                                    db.query('INSERT INTO category(name,user_id) VALUES(?,?)', [req.body.name, req.body.user_id], (error, result) =>{
                                        if(error){
                                            return res.send({ status: 0, data: 'Database Connection error' })
                                        }else{
                                            return res.send({status: 1, data: 'Category create is successfully.'})
                                        }
                                    })
                                }
                            }
                        });
                    }
                }
            }
        })
    }
}

const CategoryList = (req, res) => {
    // if (!req.isAuth) {
    //     return res.send({ status: 0, data: 'Please login your account' })
    // } else {
        db.query('SELECT * FROM category', (error, data) => {
            if (error) {
                return res.send({ status: 0, data: 'Database Connection error' })
            } else {
                return res.send({ status: 1, data: data })
            }
        });
    // }
}

const CategoryDetail = (req, res) => {
    // if (!req.isAuth) {
    //     return res.send({ status: 0, data: 'Please login your account' })
    // } else 
    if (req.query.id == '') {
        return res.send({ status: 0, data: 'Please enter id' })
    } else {
        db.query('SELECT * FROM category WHERE id=?', [req.query.id], (error, data) => {
            if (error) {
                return res.send({ status: 0, data: 'Database Connection error' })
            } else if (data == '') {
                return res.send({ status: 0, data: 'ID is not found.' })
            } else {
                return res.send({status: 1, data: data})
            }
        })
    }
}

const CategoryUpdate = (req, res) => {
    let checkCategory = CategoryPostVilidation(req.body);
    if (Object.keys(checkCategory).length) {
        return res.send({ status: 0, data: checkCategory });
    }else if(!req.body.id){
        return res.send({ status: 0, data: 'Id is required'})
    }else {
        db.query('SELECT  u.id as userId, u.name, u.image, u.email, u.phone, u.address, ul.level_name, ul.value FROM user as u JOIN user_level as ul ON u.user_level_id = ul.id WHERE u.id=?', [req.body.user_id], (err, data) => {
            if (err) {
                return res.send({ status: 0, data: 'Database Connection error' })
            } else {
                if (data == '') {
                    return res.send({ status: 0, data: 'userId Not Found' })
                } else {
                    if (data[0].value > 2) {
                        return res.send({ status: 0, data: 'Admin or Manager only can create category', value: data})
                    } else {
                        db.query('SELECT * FROM category WHERE id=?', [req.body.id],(iderror, iddata)=>{
                            if(iderror){
                                return res.send({ status: 0, data: 'Database Connection error' })
                            }else if(iddata ==''){
                                return res.send({ status: 0, data: 'Category Id is not found' })
                            }else{
                                db.query('UPDATE category SET name=?, user_id=? WHERE id=?',[req.body.name, req.body.user_id, req.body.id], (updateerror, updateData)=>{
                                    if(updateerror){
                                        return res.send({ status: 0, data: 'Database Connection error' })
                                    }else{
                                        return res.send({ status: 1, data: 'Update Category is Successfully.' })
                                    }
                                })
                            }
                        })
                    }
                }
            }
        })
    }
}

const CategoryDelete = (req, res) => {
    if(!req.query.id){
        return res.send({ status: 0, data: 'Id is required'})
    }else{
        db.query('SELECT u.id, u.user_level_id FROM category as c JOIN user as u ON  c.user_id = u.id WHERE c.id=?', [req.query.id], (error1, data1)=>{
            if(error1){
                return res.send({ status: 0, data: 'Database Connection error' })
            }else{
                if(data1 == ''){
                    return res.send({ status: 0, data: 'Category id is not found'})
                }else{
                    db.query('SELECT user_level.* FROM user JOIN user_level ON user.user_level_id = user_level.id WHERE user.id=?',[data1[0].id],(error2, data2)=>{
                        if(error2){
                            return res.send({ status: 0, data: 'Database Connection error' })
                        }else{
                            if(data2[0].value >2){
                                return res.send({ status: 0, data: 'Admin or Manager only can create category'})
                            }else{
                                db.query('DELETE FROM category WHERE id=?',[data2[0].value],(error3, data3) =>{
                                    if(error3){
                                        return res.send({ status: 0, data: 'Database Connection error' })
                                    }else{
                                        return res.send({ status: 0, data: 'Category Delete is Success.' })
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }
}

module.exports = {
    CreateCategory,
    CategoryList,
    CategoryDetail,
    CategoryUpdate,
    CategoryDelete
}