// Imports
const router = require('express').Router();
const VoteService = require('../services/VoteServices');

// Route to get all votes
router.get('/', (req, res) => {
    return VoteService.getAllVotes(req, res);
});

// Route to update dog's vote
router.put('/update/dog/', (req, res) => {
    return VoteService.updateDog(req, res);
});

// Route to update cat's vote
router.put('/update/cat/', (req, res) => {
    return VoteService.updateCat(req, res);
});

// Exports
module.exports = router;
