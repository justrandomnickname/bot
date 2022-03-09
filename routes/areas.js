var express = require("express");
var router = express.Router();
const { Area } = require("../models");

/* GET users listing. */
router.get("/:slug", async function (req, res, next) {
  console.log("SLUG IS", req.params.slug);
  const { slug: id } = req.params;
  if (id) {
    try {
      const areas = await Area.findAll({
        where: {
          cityId: id,
        },
      });

      res.status(200).send(areas);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  res.status(400).send({ message: "correct slug required" });
});

module.exports = router;
