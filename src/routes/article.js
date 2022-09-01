var express = require('express');
var router = express.Router();
const {index,create,show,update,destroy} = require('../controllers/articleController');
/* GET. */
router.get('/',index);
router.post('/',create);
router.get('/:slug',show);
router.put('/:slug',update);
router.delete('/:slug',destroy);

module.exports = router;