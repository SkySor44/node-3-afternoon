const swag = require('../models/swag.js');

module.exports = {
    add: (req, res, next) => {
        const {id} = req.query;
        let {cart} = req.session.user;
        
        const index = cart.findIndex(swag => swag.id === id);
        
        if (index === -1) {
            
            const currentSwag = swag.find(swag => swag.id == id);
           
            cart.push(currentSwag);
            req.session.user.total += currentSwag.price;
        }
        res.status(200).send(req.session.user)
    },

    delete: (req, res, next) => {
        const {id} = req.query;
        let {cart} = req.session.user
        const index = cart.findIndex(swag => swag.id === id);
        const currentSwag = swag.find(swag => swag.id == id);
        if (currentSwag){
            cart.splice(index, 1);
            req.session.user.total -= currentSwag.price;
        }
        res.status(200).send(req.session.user)
    },

    checkout: (req, res, next) => {
        const {user} = req.session;
        user.cart = [];
        user.total = 0;
        res.status(200).send(req.session.user)
    }
}