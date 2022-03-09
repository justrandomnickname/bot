var express = require("express");
var router = express.Router();
const { Ticket, Area } = require("../models");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const { query } = req;

  if (query.cityId) {
    try {
      const cities = await Area.findAll({
        where: {
          cityId: query.cityId,
        },
        include: [
          {
            model: Ticket,
            required: true,
          },
        ],
      });

      res.status(200).send(cities);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  }
  if (!query.cityId) {
    res.status(400).send("area id required");
  }
});

module.exports = router;
