// import dependancies
const { Schema, model } = require('mongoose');

// create the schema for the model
const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        defualt: 'Large'
    },
    toppings: []
});

//create the pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//export the Pizza Model
module.exports = Pizza;