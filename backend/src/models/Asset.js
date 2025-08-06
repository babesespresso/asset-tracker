const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide asset name'],
    trim: true,
    maxlength: [100, 'Asset name cannot exceed 100 characters']
  },
  type: {
    type: String,
    required: [true, 'Please provide asset type'],
    enum: ['laptop', 'desktop', 'mobile', 'tablet', 'printer', 'scanner', 'camera', 'network', 'software', 'hardware', 'other']
  },
  category: {
    type: String,
    required: [true, 'Please provide category'],
    enum: ['IT Equipment', 'Office Equipment', 'Furniture', 'Vehicles', 'Software Licenses', 'Hardware', 'Other']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  serialNumber: {
    type: String,
    required: [true, 'Please provide serial number'],
    unique: true,
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Please provide model'],
    trim: true
  },
  manufacturer: {
    type: String,
    required: [true, 'Please provide manufacturer'],
    trim: true
  },
  purchaseDate: {
    type: Date,
    required: [true, 'Please provide purchase date']
  },
  purchasePrice: {
    type: Number,
    required: [true, 'Please provide purchase price'],
    min: [0, 'Price cannot be negative']
  },
  currentValue: {
    type: Number,
    min: [0, 'Value cannot be negative']
  },
  warrantyExpiry: {
    type: Date
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance', 'disposed', 'lost', 'damaged'],
    default: 'active'
  },
  condition: {
    type: String,
    enum: ['excellent', 'good', 'fair', 'poor', 'damaged'],
    default: 'good'
  },
  location: {
    type: String,
    required: [true, 'Please provide location'],
    trim: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  assignedDate: {
    type: Date,
    default: null
  },
  department: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  images: [{
    type: String
  }],
  documents: [{
    name: String,
    url: String,
    type: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  maintenanceHistory: [{
    date: {
      type: Date,
      required: true
    },
    type: {
      type: String,
      enum: ['preventive', 'corrective', 'upgrade', 'inspection'],
      required: true
    },
    description: String,
    cost: {
      type: Number,
      min: 0
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    nextDue: Date
  }],
  customFields: {
    type: Map,
    of: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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

assetSchema.index({ name: 'text', description: 'text', serialNumber: 'text' });
assetSchema.index({ assignedTo: 1 });
assetSchema.index({ status: 1 });
assetSchema.index({ location: 1 });
assetSchema.index({ category: 1 });

module.exports = mongoose.model('Asset', assetSchema);
