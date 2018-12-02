var express = require('express');
var router = express.Router();
var bidsRoutes = require('./bids');

//this is just a health check
router.get('/api-status', function(req, res){
    res.json({status: "ok"})
});

router.use('/bids', bidsRoutes);

module.exports = router;