const mongoose = require('mongoose')

const Page = new mongoose.Schema({
    lists: [
        {
            list_name: String,
            tasks: [{
                text: String,
                task_id: Number
            }],
            list_id: Number
        },
    ]
})

module.exports = mongoose.model('Page', Page)