var express = require('express');
var router = express.Router();
const WorkoutController = require('../controllers/WorkoutController.ts');

/* GET users listing. */
router.post('/', WorkoutController.index);
router.post('/add', WorkoutController.add);
router.post('/filter', WorkoutController.filterWorkouts);

module.exports = router;
