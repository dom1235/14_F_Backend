const {konyvek} = require('../database/database')

const getkonyvek = (req, res) => {
    res.status(200).json(konyvek)
}

//add vissza mondjuk az 5-ös id könyvet
const getKonyvById = (req,res) => {
    let paramId = Number(req.params.id);
    let konyv = konyvek.filter(konyv => konyv.id == paramId)
    res.json(konyv);
}

module.exports = {
    getkonyvek,
    getKonyvById
}