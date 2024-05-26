const express = require('express')
const cors = require('cors')
const isAuth = require('./middleware/middleware');
const app = express();
app.use(express.json());
app.use(cors())
app.use(isAuth);
app.use('/api/auth',require('./Route/AuthRoute'));
app.use('/api/user',require('./Route/userRoute'));
app.use('/api/category',require('./Route/CategoryRoute'));

app.listen(9000, () =>{
    console.log('We run our project at port: 100')
})