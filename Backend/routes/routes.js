const express = require('express')
const router = express.Router()
const Question = require('../schemas/question-schema')
var secured = require('../lib/middleware/secured');
// const indexRouter = require('../frontend/index.jsx')
// Route getting questions, route getting one question, route getting list of questions of a certain type
// route for making new question
// route for updating question
// route for deleting question


//get all questions
router.get('/questions', async(req, res) => {
    try {
        const questions = await Question.find()
        res.send(questions)
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({"error": error})
    }
})

// get one quiz question
router.get('/questions/:id', async(req, res) => {
    try {
        const _id = req.params.id 

        const question = await Question.findOne({_id})        
        if(!question){
            return res.status(404).json({})
        }else{
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// create one quiz question
router.post('/questions', async (req, res) => {
    try{
        const { lists } = req.body

        const question = await Question.create({lists})

        return res.status(200).json(question)
    } catch(error){
        return res.status(500).json({"error": error})
    }
})

// update one quiz question
router.put('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id 
        const { description, alternatives } = req.body

        let question = await Question.findOne({_id})

        if(!question){
            question = await Question.create({
                description,
                alternatives
            })    
            return res.status(201).json(question)
        }else{
            question.description = description
            question.alternatives = alternatives
            await question.save()
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// delete one quiz question
router.delete('/questions/:id', async(req, res) => {
    try {
        const _id = req.params.id 

        const question = await Question.deleteOne({_id})

        if(question.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

router.get('/user', secured(), function(req, res, next) {
    const {_raw, _json, ...userProfile} = req.user;
    return res.status(200).json(userProfile);
})


router.get('/callback', function (req, res, next) {
    passport.authenticate('auth0', function (err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      req.logIn(user, function (err) {
        if (err) { return next(err); }
        const returnTo = req.session.returnTo;
        delete req.session.returnTo;
        res.redirect(returnTo || '/user');
      });
    })(req, res, next);
  });

module.exports = router
