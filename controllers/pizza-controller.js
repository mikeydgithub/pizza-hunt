// functionality inside the controller 

// handle pizza model updates
const { Pizza } = require('../models');

// the functions will go in here as methods
const pizzaController = {
    // get all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    // get one pizza by id
    getPizzaById({params}, res) {
        Pizza.findOne({_id: params.id})
        .then(dbPizzaData => {
            // if no pizza is found, send 404
            if (!dbPizzaData) {
                res.status(404).json({message: 'No pizza found with this id!'})
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // createPizza
    createPizza({body}, res) {
        Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    },

    // update pizza by id
    // .findOneAndUpdate() method Mongoose finds a single document we want to update, then updates it and returns the updated document.
    // by setting the parmeter to ture, we're instucting mongoose to return the new version of the ducment.
    updatePizza({params,body}, res) {
        Pizza.findOneAndUpdate({_id: params.id}, body, {new:true})
        .then(dbPizzaData => {
            if(!dbPizzaData) {
                res.status(404).json({message:'No pizza found with this id!'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete pizza
    deletePizza({params}, res) {
        Pizza.findOneAndDelete({_id: params.id})
        .then(dbPizzaData => {
            if(!dbPizzaData) {
                res.status(404).json({message: 'No pizza found with this id!'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    }
}


// data that will be exported
module.exports = pizzaController;