// functionality inside the controller 

// handle pizza model updates
const { Pizza } = require('../models');

// the functions will go in here as methods
const pizzaController = {
    // get all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
        .populate({
            path: 'comments',
            // the minus sign in the select option says that we dont want it if it's returned.
            select: '-__v'
        })
        // update the query to not include the pizza's __v field either
        .select('-__v')
        // sort in a descending order by its _id value so the newest pizza returns first.
        .sort({_id: -1})
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    // get one pizza by id
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
        // .populate takes the relationship from comments here. Shown as the path to the comments.
        .populate({
            path: 'comments',
            // '-__v' is a minus symbol to remove the version from the request.
            select: '-__v'
        })
        .select('-__v')
        .then(dbPizzaData => res.json(dbPizzaData)) 
            // if no pizza is found, send 404
            // if (!dbPizzaData) {
            //     res.status(404).json({message: 'No pizza found with this id!'})
            //     return;
            // }
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })    
    },

    // createPizza
    createPizza({ body }, res) {
        Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    },

    // update pizza by id
    // .findOneAndUpdate() method Mongoose finds a single document we want to update, then updates it and returns the updated document.
    // by setting the parmeter to true, we're instucting mongoose to return the new version of the document.
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
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
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({_id: params.id})
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    }
}


// data that will be exported
module.exports = pizzaController;