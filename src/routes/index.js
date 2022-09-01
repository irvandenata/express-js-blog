var express = require('express');
var router = express.Router();
const tagRouters = require('./tag');
const articleRouters = require('./article');
const userRouters = require('./user');
const categoryRouters = require('./category');

/* GET home page. */

router.use('/tags',tagRouters);
router.use('/categories',categoryRouters);
router.use('/articles',articleRouters);
router.use('/users',userRouters);
router.get('/',function (req,res,next)
{
  res.json({title: 'Express'});
});

module.exports = router;
