const express = require('express');
const {
  viewUsersCredits,
  updateUserCredits,
  getAdminDashboard,
  getAllUsers,
  getAllReports
} = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware');
const { roleMiddleware } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/users', protect, roleMiddleware('admin'), viewUsersCredits);
router.get('/dashboard', protect, roleMiddleware('admin'), getAdminDashboard);
router.post('/users/update-credits', protect, roleMiddleware('admin'), updateUserCredits);
router.get('/all-users', protect, roleMiddleware('admin'), getAllUsers);
router.get('/reports', protect, roleMiddleware('admin'), getAllReports);
 

module.exports = router;
