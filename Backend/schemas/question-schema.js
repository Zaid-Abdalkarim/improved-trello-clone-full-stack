const mongoose = require('mongoose')

const Page = new mongoose.Schema({
    lists: [
        {
            "": String,
            tasks: [{
                text: String,
                task_id: Number
            }]
        },
    ]
})

module.exports = mongoose.model('Page', Page)