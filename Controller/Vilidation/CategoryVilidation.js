const CategoryPostVilidation = (value) =>{
    let check = {};
    if(!value.name){
        check.name='Please Enter your name.'
    }
    if(!value.user_id){
        check.userid='Please Enter your userId.'
    }
    return check;
}

module.exports = {
    CategoryPostVilidation
}