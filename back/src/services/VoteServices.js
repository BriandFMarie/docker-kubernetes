// Imports
const Vote = require('../models/Vote');
const logger = require('../config/logger');

// To get all votes
function getAllVotes(req, res) {
    Vote.find()
        .then(votes => {
            console.log(votes)
            return res.status(200).json({ success: true, result: votes });
        })
        .catch(err => res.status(405).json({ success: false, message: err }));
}

// To update a dog's vote
function updateDog(req, res) {
    Vote.updateOne({ $inc: { voteDogs: 1 } })
        .then(() => {
            return res.status(201).json({ success: true, message: "Dog's vote updated" });
        })
        .then(() => logger.info("Dog's vote updated"))
        .catch(err => res.status(405).json({ success: false, message: err }));
}

// To update a cat's vote
function updateCat(req, res) {
    Vote.updateOne({ $inc: { voteCats: 1 } })
        .then(() => {
            return res.status(201).json({ success: true, message: "Cat's vote updated" });
        })
        .then(() => logger.info("Cat's vote updated"))
        .catch(err => res.status(405).json({ success: false, message: err }));
}

// Exports
module.exports = { getAllVotes,  updateDog, updateCat};
