var express = require('express');
var router = express.Router();
const joueurController = require("../controller/JoueurController");

router.post("/add", joueurController.add);
router.get("/getall", joueurController.getall);
router.get("/getbyid/:id", joueurController.getbyid);
router.delete("/deletebyid/:id", joueurController.deletebyid);
router.put("/attaque/:id1/:id2", joueurController.attaque);
router.post("/addpartie/:id1/:id2", joueurController.addpartie);
router.get("/partie", (req, res, next) => {
    res.render("partie");
  });

module.exports = router;
