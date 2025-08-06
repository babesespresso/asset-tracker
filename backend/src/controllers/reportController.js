const Report = require('../models/Report');
const Asset = require('../models/Asset');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');

const getReports = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, status } = req.query;

    const query = {};
    if (type) query.type = type;
    if (status) query.status = status;

    const reports = await Report.find(query)
      .populate('generatedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Report.countDocuments(query);

    res.status(200).json({
      success: true,
      data: reports,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

const getReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('generatedBy', 'name email');

    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      });
    }

    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

const generateReport = async (req, res) => {
  try {
    const { title, type, description, filters } = req.body;

    const report = await Report.create({
      title,
      type,
      description,
      filters,
      generatedBy: req.user._id,
      status: 'processing'
    });

    let reportData = {};

    switch (type) {
      case 'asset-summary':
        reportData = await generateAssetSummary(filters);
        break;
      case 'asset-details':
        reportData = await generateAssetDetails(filters);
        break;
      case 'maintenance':
        reportData = await generateMaintenanceReport(filters);
        break;
      case 'depreciation':
        reportData = await generateDepreciationReport(filters);
        break;
      default:
        reportData = await generateCustomReport(filters);
    }

    report.data = reportData;
    report.status = 'completed';
    await report.save();

    await AuditLog.create({
      action: 'create',
      resource: 'report',
      resourceId: report._id,
      user: req.user._id,
      changes: { title, type, description }
    });

    res.status(201).json({
      success: true,
      data: report
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

const generateAssetSummary = async (filters) => {
  const query = buildQueryFromFilters(filters);
  
  const assets = await Asset.find(query);
  
  const summary = {
    totalAssets: assets.length,
    totalValue: assets.reduce((sum, asset) => sum + (asset.currentValue || 0), 0),
    byStatus: {},
    byCategory: {},
    byLocation: {},
    byType: {}
  };

  assets.forEach(asset => {
    summary.byStatus[asset.status] = (summary.byStatus[asset.status] || 0) + 1;
    summary.byCategory[asset.category] = (summary.byCategory[asset.category] || 0) + 1;
    summary.byLocation[asset.location] = (summary.byLocation[asset.location] || 0) + 1;
    summary.byType[asset.type] = (summary.byType[asset.type] || 0) + 1;
  });

  return summary;
};

const generateAssetDetails = async (filters) => {
  const query = buildQueryFromFilters(filters);
  
  const assets = await Asset.find(query)
    .populate('assignedTo', 'name email department')
    .populate('createdBy', 'name email');

  return {
    assets,
    total: assets.length
  };
};

const generateMaintenanceReport = async (filters) => {
  const query = buildQueryFromFilters(filters);
  
  const assets = await Asset.find(query)
    .populate('maintenanceHistory.performedBy', 'name email');

  const maintenanceData = [];
  assets.forEach(asset => {
    asset.maintenanceHistory.forEach(maintenance => {
      maintenanceData.push({
        asset: asset.name,
        assetId: asset._id,
        ...maintenance.toObject()
      });
    });
  });

  return {
    maintenanceRecords: maintenanceData,
    totalRecords: maintenanceData.length
  };
};

const generateDepreciationReport = async (filters) => {
  const query = buildQueryFromFilters(filters);
  
  const assets = await Asset.find(query);
  
  const depreciationData = assets.map(asset => ({
    asset: asset.name,
    assetId: asset._id,
    purchasePrice: asset.purchasePrice,
    currentValue: asset.currentValue || 0,
    depreciation: asset.purchasePrice - (asset.currentValue || 0),
    depreciationRate: ((asset.purchasePrice - (asset.currentValue || 0)) / asset.purchasePrice * 100).toFixed(2)
  }));

  return {
    assets: depreciationData,
    totalDepreciation: depreciationData.reduce((sum, item) => sum + item.depreciation, 0)
  };
};

const generateCustomReport = async (filters) => {
  const query = buildQueryFromFilters(filters);
  
  const assets = await Asset.find(query);
  
  return {
    assets,
    total: assets.length
  };
};

const buildQueryFromFilters = (filters) => {
  const query = {};
  
  if (filters.dateRange) {
    query.createdAt = {
      $gte: new Date(filters.dateRange.start),
      $lte: new Date(filters.dateRange.end)
    };
  }
  
  if (filters.categories && filters.categories.length > 0) {
    query.category = { $in: filters.categories };
  }
  
  if (filters.locations && filters.locations.length > 0) {
    query.location = { $in: filters.locations };
  }
  
  if (filters.status && filters.status.length > 0) {
    query.status = { $in: filters.status };
  }
  
  if (filters.assignedTo && filters.assignedTo.length > 0) {
    query.assignedTo = { $in: filters.assignedTo };
  }
  
  if (filters.departments && filters.departments.length > 0) {
    query.department = { $in: filters.departments };
  }

  return query;
};

const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      });
    }

    await Report.findByIdAndDelete(req.params.id);

    await AuditLog.create({
      action: 'delete',
      resource: 'report',
      resourceId: report._id,
      user: req.user._id
    });

    res.status(200).json({
      success: true,
      message: 'Report deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getReports,
  getReport,
  generateReport,
  deleteReport
};
