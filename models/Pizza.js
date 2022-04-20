// import dependancies
const { Schema, model } = require('mongoose');

// create the schema for the model
const PizzaSchema = new Schema(
    {
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
        toppings: [],
        comments:[
            {
                // Data comes from Comment model. Parent and child refernce. The Child can be referenced in the parent but not the other way around.
                type: Schema.Types.ObjectId,
                // ref: 'Comment' tells the Pizza model which documents to search
                ref: 'Comment'
            }
        ]
    },
    // tell the schema to use virtuals.
    {
    toJSON: {
        virutals: true,
    },
    // set id to false bcause this is a virtual that mongoose returns and we don't need it.
    id: false
    }
);

// get total count of comments and replies on retrieval
// virtual properties
PizzaSchema.vitual('comment').get(function() {
    return this.comments.length;
});

//create the pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//export the Pizza Model
module.exports = Pizza;