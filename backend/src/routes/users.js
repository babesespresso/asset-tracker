const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getUsers)
  .post(authorize('admin', 'manager'), createUser);

router.route('/:id')
  .get(getUser)
  .put(authorize('admin', 'manager'), updateUser)
  .delete(authorize('admin'), deleteUser);

module.exports = router;
