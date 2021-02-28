const express = require('express')
const router = express.Router()
const Question = require('../schemas/question-schema')
var secured = require('../lib/middleware/secured');
// const indexRouter = require('../frontend/index.jsx')
// Route getting questions, route getting one question, route getting list of questions of a certain type
// route for making new question
// route for updating question
// route for deleting question


//working get all lists
router.get('/questions', async(req, res) => {
    try {
        const questions = await Question.find()
        res.send(questions)
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({"error": error})
    }
})

// working get one list
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

// working create one list
router.post('/questions', async (req, res) => {
    try{
        const List = await Question.create({
            list_name : req.body.list_name
        })

        await List.save()
        return res.status(200).json(List)
    } catch(error){
        return res.status(500).json({"error": error})
    }
})

//working get one task
router.get('/questions/:list/:task', async (req, res) => {
    try {
        const _list = req.params.list 
        const _task = req.params.task
        console.log(_task)
        const question = await Question.findOne({_id: _list})
        for (let index = 0; index < question.task.length; index++) {
            if(req.params.task = question.task[index]._id)
                return res.status(200).json(question.task[index])
        }
        return res.status(404).json({})
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})


// working put new task
router.post('/questions/:list', async (req, res) => {
    try {
        console.log(await Question.findOne({_id: req.params.list}))
        const question = await Question.findOneAndUpdate({"_id": req.params.list}, {"$push": {task:{"text": req.body.text}}}, {new:true})

        if (!question)
            return res.status(404).json({})
        else
            return res.status(200).json(question)
            
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

//working delete one list question
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

//working delete one task
router.delete('/questions/:list/:task', async(req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(req.params.list, {$pull: {"task": {_id: req.params.task}}}, {safe: true, upsert: true})

        console.log(question)

        if(question.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

module.exports = router


//this is a duplicate idk? 
// router.put('/questions/:list/:task', async (req, res) => {
//     try {
//         const _task = req.params.task
//         const question = await Question.findOneAndUpdate({"task._id": _task}, {$set: {task:{"text": req.body.text}}}, {new:true}, (err, doc) => {
//             if (err) {
//                 console.log("something went wrong")
//             }
//             console.log(doc);
//             return res.status(200).json(doc)
//         })

//         console.log(question.task[0])

//         return res.status(404).json({})
        
//     } catch (error) {
//         return res.status(500).json({"error":error})
//     }
// })