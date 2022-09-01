var express = require('express');
var router = express.Router();
const {index,create,show,update,destroy} = require('../controllers/userController');
/* GET. */
router.get('/',index);
router.post('/',create);
router.get('/:username',show);
router.put('/:username',update);
router.delete('/:username',destroy);

module.exports = router;