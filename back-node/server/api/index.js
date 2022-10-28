const express = require('express');
const router = express.Router();

const getHotelList = require('./controllers/hotel.controller') 

router.post('/getHotels', getHotelList)

module.exports = router;