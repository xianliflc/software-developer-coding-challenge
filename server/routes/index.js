var express = require('express');
var router = express.Router();
var bidsRoutes = require('./bids');
var userRoutes = require('./user');
var carRoutes = require('./car');

//this is just a health check
router.get('/api-status', function(req, res){
    res.json({status: "ok"})
});

router.use('/bids', bidsRoutes);
router.use('/user', userRoutes);
router.use('/car', carRoutes);

module.exports = router;