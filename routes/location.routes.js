const router = require('express').Router();
const locationController = require('../controllers/location.controller');

router.get("/", locationController.getAllLocations);
router.post('/', locationController.setLocation);

module.exports = router;