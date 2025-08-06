const express = require('express');
const {
  getAssets,
  getAsset,
  createAsset,
  updateAsset,
  deleteAsset,
  assignAsset,
  unassignAsset,
  getAssetStats,
  uploadImages
} = require('../controllers/assetController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.use(protect);

router.route('/stats')
  .get(getAssetStats);

router.route('/')
  .get(getAssets)
  .post(authorize('admin', 'manager'), createAsset);

router.route('/upload')
  .post(authorize('admin', 'manager'), upload.array('images', 5), uploadImages);

router.route('/:id')
  .get(getAsset)
  .put(authorize('admin', 'manager'), updateAsset)
  .delete(authorize('admin'), deleteAsset);

router.route('/:id/assign')
  .post(authorize('admin', 'manager'), assignAsset);

router.route('/:id/unassign')
  .post(authorize('admin', 'manager'), unassignAsset);

module.exports = router;
