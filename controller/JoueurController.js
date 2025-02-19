const Joueur = require("../model/Joueur");
const Partie = require("../model/Partie");

async function add(req, res, next) {
  try {
    const joueur = new Joueur({
      pseudo: req.body.pseudo,
      sante: 100,
      score: 0,
    });
    await joueur.save();
    res.status(200).send("add good");
  } catch (err) {
    console.log(err);
  }
}

async function getall(req, res, next) {
    try {
      const data = await Joueur.find();
      res.json(data);
    } catch (err) {
      console.log(err);
    }
  }
  async function getbyid(req, res, next) {
    try {
      const data = await Joueur.findById(req.params.id);
      res.json(data);
    } catch (err) {
      console.log(err);
    }
  }
  async function deletebyid(req, res, next) {
    try {
      const data = await Joueur.findByIdAndDelete(req.params.id);
      res.json(data);
    } catch (err) {
      console.log(err);
    }
  }
  async function attaque(req, res, next) {
    try {
      const j1 = await Joueur.findById(req.params.id1);
      const j2 = await Joueur.findById(req.params.id2);
      score1 = j1.score + 10;
      sante2 = j2.sante - 20;
  
      const j1u = await Joueur.findByIdAndUpdate(req.params.id1, {
        score: score1,
      });
      const j2u = await Joueur.findByIdAndUpdate(req.params.id2, {
        sante: sante2,
      });
      res.send(j1u + "a attaque" + j2u);
    } catch (err) {
      console.log(err);
    }
  }
  async function addpartie(req, res, next) {

    try {
        const j1 = await Joueur.findById(req.params.id1);
      const j2 = await Joueur.findById(req.params.id2);
      const partie = new Partie ({
        nom: req.body.nom,
        joueur_1: j1,
        joueur_2: j2,
        etat: "EN COURS",
      });
      await partie.save();
      res.status(200).send("add good partie");
    } catch (err) {
      console.log(err);
    }
  }
  async function addpartiesocket(data) {
    try {
      const partie = new Partie({
        nom: data.nom,
        joueur_1: data.id1,
        joueur_2: data.id2,
        etat: "EN COURS",
      });
      console.log("jjjjj" + JSON.stringify(data));
      const ju1 = await Joueur.findByIdAndUpdate(data.id2, {
        sante: 100,
        score: 0,
      });
      const ju2 = await Joueur.findByIdAndUpdate(data.id3, {
        sante: 100,
        score: 0,
      });
      await partie.save();
      //res.status(200).send("add good partie");
    } catch (err) {
      console.log(err);
    }
  }
  
  async function affichesocket(data) {
    try {
      console.log("kkkk" + JSON.stringify(data));
      const j1 = await Joueur.findById(data.id1);
      const j2 = await Joueur.findById(data.id2);
  
      r = { j1: j1, j2: j2 };
      return r;
    } catch (err) {
      console.log(err);
    }
  }
module.exports = {
  add,
  getall,
  getbyid,
  deletebyid,
  attaque,
  addpartie,
  addpartiesocket,
  affichesocket,
};
