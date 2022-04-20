const { Comment, Pizza } = require('../models');

const commentController = {
    // add comment to pizza
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
        .then(({_id}) => {
            return Pizza.findOneAndUpdate(
                // our comments section will require an id already made from the parameters of a pizza id
                {_id: params.pizzaId},
                // push will create a new comment and give an id
                {$push: { comments: _id } },
                // new: true will return the updated comment
                { new: true}
            );
        })
        // if there is no error create the database for pizza data otherwise error check
        .then(dbPizzaData => {
            if(!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with this id!'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    },

    //remove comment. only requires the params and not a body since we can remove it with just an id.
    removeComment({ params }, res) {
        Comment.findOneAndDelete({_id: params.commentId })
        .then(deletedComment => {
            if(!deletedComment) {
                return res.status(404).json({message: 'No comment with this id!'});
            }
            return Pizza.findOneAndUpdate(
                { _id: params.pizzaId },
                // pull it out of the existing parameters from comments by their commentId
                { $pull: { comments: params.commentId } },
                // new: true will return the updated comment
                { new: true }
            )
        })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
              res.status(404).json({ message: 'No pizza found with this id!' });
              return;
            }
            res.json(dbPizzaData);
          })
          .catch(err => res.json(err));
    }
};

module.exports = commentController