const Setting = require('../models/Setting');
const AuditLog = require('../models/AuditLog');

const getSettings = async (req, res) => {
  try {
    const { category } = req.query;
    
    const query = {};
    if (category) query.category = category;
    
    const settings = await Setting.find(query).sort({ key: 1 });
    
    res.status(200).json({
      success: true,
      data: settings
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

const getSetting = async (req, res) => {
  try {
    const setting = await Setting.findOne({ key: req.params.key });
    
    if (!setting) {
      return res.status(404).json({
        success: false,
        error: 'Setting not found'
      });
    }

    res.status(200).json({
      success: true,
      data: setting
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

const createSetting = async (req, res) => {
  try {
    const { key, value, type, description, category, isPublic, options } = req.body;

    const existingSetting = await Setting.findOne({ key });
    if (existingSetting) {
      return res.status(400).json({
        success: false,
        error: 'Setting with this key already exists'
      });
    }

    const setting = await Setting.create({
      key,
      value,
      type,
      description,
      category,
      isPublic,
      options,
      updatedBy: req.user._id
    });

    await AuditLog.create({
      action: 'create',
      resource: 'setting',
      resourceId: setting._id,
      user: req.user._id,
      changes: { key, value, type, description, category, isPublic, options }
    });

    res.status(201).json({
      success: true,
      data: setting
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

const updateSetting = async (req, res) => {
  try {
    const { value, description, isPublic, options } = req.body;

    const setting = await Setting.findOne({ key: req.params.key });
    if (!setting) {
      return res.status(404).json({
        success: false,
        error: 'Setting not found'
      });
    }

    const changes = {};
    if (value !== undefined) changes.value = value;
    if (description !== undefined) changes.description = description;
    if (isPublic !== undefined) changes.isPublic = isPublic;
    if (options !== undefined) changes.options = options;

    const updatedSetting = await Setting.findOneAndUpdate(
      { key: req.params.key },
      { ...changes, updatedBy: req.user._id },
      { new: true, runValidators: true }
    );

    await AuditLog.create({
      action: 'update',
      resource: 'setting',
      resourceId: setting._id,
      user: req.user._id,
      changes
    });

    res.status(200).json({
      success: true,
      data: updatedSetting
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

const deleteSetting = async (req, res) => {
  try {
    const setting = await Setting.findOne({ key: req.params.key });
    if (!setting) {
      return res.status(404).json({
        success: false,
        error: 'Setting not found'
      });
    }

    await Setting.findOneAndDelete({ key: req.params.key });

    await AuditLog.create({
      action: 'delete',
      resource: 'setting',
      resourceId: setting._id,
      user: req.user._id
    });

    res.status(200).json({
      success: true,
      message: 'Setting deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getSettings,
  getSetting,
  createSetting,
  updateSetting,
  deleteSetting
};
