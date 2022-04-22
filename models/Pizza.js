// import dependancies
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


// create the schema for the model
const PizzaSchema = new Schema(
    {
        pizzaName: {
            type: String,
            // required: true is for valdation and trim used to remove whitespace before and after the input string.
            required: true,
            trim: true,
        },
        createdBy: {
            type: String,
            required: true,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        size: {
            type: String,
            required: true,
            // enum stands for enumerable refers to a set of data that can be iterated over-much like using the for...in loop.
            enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
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
        getters: true
    },
    // set id to false bcause this is a virtual that mongoose returns and we don't need it.
    id: false
    }
);

// get total count of comments and replies on retrieval
// virtual properties
// .reduce() walks through the array, it passes the accuulating total and the current value of the comment into the function,
// with the return of the function revising the total for the next iteration through the array.
// accumulater here is total and currentvalue is comment.
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

//create the pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//export the Pizza Model
module.exports = Pizza;