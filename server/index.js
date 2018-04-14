const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const port = process.env.PORT || 3000;
const checkForSession = require('./middlewares/checkForSession');
const sc = require('./controllers/swag_controller');
const ac = require('./controllers/auth_controller');
const cc = require('./controllers/cart_controller');
const search_ctrl = require('./controllers/search_controller');

const app = express();
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(checkForSession);
app.use(express.static(`${__dirname}/build`))


app.get('/api/swag', sc.read);

app.post('/api/login', ac.login);
app.post('/api/register', ac.register);
app.post('/api/signout', ac.signout);
app.get('/api/user', ac.getUser);

app.post('/api/cart', cc.add);
app.post('/api/cart/checkout', cc.checkout);
app.delete('/api/cart', cc.delete)

app.get('/api/search', search_ctrl.search);



app.listen(port, () => console.log(`I'm listening on port ${port}`))