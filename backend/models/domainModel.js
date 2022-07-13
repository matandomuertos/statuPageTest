// structure of the collection in mongoDB
const mongoose = require('mongoose')

const domainSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a domain name'],
    },
    url: {
      type: String,
      required: [true, 'Please add a domain url'],
    },
    ping: {
      type: Boolean,
    }
  },
  {
    timestamps: true, //it will store when it was created and updated
  }
)

module.exports = mongoose.model('Domain', domainSchema) //export model with name Domain (the collection will be created with this name if it doesn't exist) and the schema