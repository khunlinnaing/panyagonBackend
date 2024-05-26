const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const numberRegex =  /^\d+$/;
const registerVilidation = (data)=>{
    
    let values={}
    if(!data.name){
        values.name = 'Please Enter your name';
    }
    if(!data.email){
        values.email = 'Please Enter your name';
    }else if(!emailRegex.test(data.email)){
        values.email = 'Email format is invalid.';
    }
    if(!data.phone){
        values.phone = 'Please Enter your phone number';
    }else if(!numberRegex.test(data.phone)){
        values.phone = 'Please enter 0 to 9 only';
    }else if((data.phone).length < 9 || (data.phone).length > 11){
        values.phone = 'Please enter phone number is minnum 9 and maxmun 11';
    }
    if(!data.address){
        values.address = 'Please enter your address';
    }
    if(!data.password){
        values.password = 'Please enter your password';
    }else if((data.password).length < 8){
        values.password = 'Please enter password at least 8 charactors';
    }
    if(!data.confirm_password){
        values.confirm_password = 'Please enter your confirm_password';
    }else if(data.password != data.confirm_password){
        values.confirm_password = 'password and confirm password is not match.';
    }
    return values;
}

const loginVilidation=(value) =>{
    console.log(value)
    let check={};
    if(!value.email){
        check.email = 'Please Enter your name';
    }else if(!emailRegex.test(value.email)){
        check.email = 'Email format is invalid.';
    }
    if(!value.password){
        check.password = 'Please enter your password';
    }else if((value.password).length < 8){
        check.password = 'Please enter password at least 8 charactors';
    }
    return check;
}
const vertificationVilidation=(value)=>{
    let result={};
    if(value.code == ''){
        result.code='Please enter your vertification code.';
    }else if(!numberRegex.test(value.code)){
        result.code = 'Verification is only 0 to 9';
    }
    return result;
}

module.exports = {
    registerVilidation,
    loginVilidation,
    vertificationVilidation
}