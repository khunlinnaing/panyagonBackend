const nodemailer = require('nodemailer')
function SendEmail(email, opt){
    
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'khunlinnaing90@gmail.com',
            pass: 'jnsw msev atbf oojz'
        }
    });
    const mail_option = {
        from : 'khunlinnaing90@gmail.com',
        to: email,
        subject: 'Make your Verification Code.',
        text: `this is your verification code:${opt}`
    };
    return transporter.sendMail(mail_option, (error, info) => {
        if (error) {
            return error;
        }
        else {
            return info
        }
    });
}
module.exports = {
    SendEmail,
  };