var express = require('express');
var router = express.Router();
const match = require('../Models/match');




//get all matches
router.get('/', async (req, res, next) => {
    const matches = await match.find();
    res.json(matches)
})
//delete one match
router.delete('/:id', async (req, res, next) => {

    await match.findByIdAndDelete(req.params.id)
    res.json("deleated")
})
//get matche by id 
router.get('/:id', async (req, res, next) => {
    const matchById = await match.findById(req.params.id)
    res.json(matchById)
})
//post
router.post('/', async (req, res, next) => {
    const matche = new match(req.body);
    await matche.save()
   
    res.json(matche)
})


// Route to update a match by ID

//add score  team one





// Define route handler for updating the score
router.put('/:id/scoreincrement', async (req, res) => {
  
  
    
    // Retrieve the match from the database
    const matchs = await match.findById(req.params.id);

    

    // Increment the first value in the score variable
    matchs.score[0] += 1;

    // Save the updated match back to the database
    await matchs.save();

    // Respond with the updated match
    return res.json(matchs);
  
});

//deleat score  team one


//add score  team two




//deleat score  team two





module.exports = router;