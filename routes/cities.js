var express = require("express");
var router = express.Router();
const { City } = require("../models");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const cities = await City.findAll();

    res.status(200).send(cities);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
