const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  key: {
    type: String,
    required: [true, 'Please provide setting key'],
    unique: true,
    trim: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, 'Please provide setting value']
  },
  type: {
    type: String,
    required: [true, 'Please provide setting type'],
    enum: ['string', 'number', 'boolean', 'object', 'array']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Please provide category'],
    enum: ['general', 'email', 'security', 'appearance', 'notifications', 'integrations']
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  options: [{
    type: String
  }],
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Setting', settingSchema);
