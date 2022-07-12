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
        default: Date.now
      }
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Status', statusSchema)