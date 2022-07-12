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
    timestamps: true,
  }
)

module.exports = mongoose.model('Domain', domainSchema)