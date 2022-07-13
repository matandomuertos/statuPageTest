// structure of the collection in mongoDB
const mongoose = require('mongoose')

const statusSchema = mongoose.Schema(
  {
    domainId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Status',
      unique: true
    },
    history: {
      isUp: {
        type: Boolean,
        required: true,
      },
      date: {
        type : Date, 
        default: Date.now //this is the default value but actually I think it's not working
      }
    }
  },
  {
    timestamps: true, //it will store when it was created and updated
  }
)

module.exports = mongoose.model('Status', statusSchema) //export model with name Status (the collection will be created with this name if it doesn't exist) and the schema