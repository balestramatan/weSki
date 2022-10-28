const express = require('express')
const weSkiRoutes = express.Router();

const getHotels = async (req, res) => {
    res.send('Hello World!')
}
weSkiRoutes.route("/getHotels").get(getHotels)

module.exports = weSkiRoutes;