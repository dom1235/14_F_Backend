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

const getKonyvekByar = (req, res) => {
    let paramAr = req.params.ar;
    let getKonyvekByar = konyvek.filter(konyv => konyv.price < paramAr)
    res.json(getKonyvekByar)
}

const getKonyvDarab = (req,res) => {
    res.json({darab: konyvek.length})
}

const getKonyvByCim = (req, res) => {
    let paramCim = req.params.cim.toLowerCase().trim();
    const konyv = konyvek.filter(konyv => {
        let kisbetus = konyv.title.toLowerCase().replaceAll(' ', '').trim();
        if (kisbetus == paramCim)
            return konyv;
    });
    res.json(konyv);
};

const getKonyvBySzerzo = (req, res) => {
    let szerzok = req.params.szerzo.toLowerCase().replaceAll(' ', '').trim();
    const konyv = konyvek.filter(konyv => {
        let kisbetus = konyv.author.toLowerCase().replaceAll(' ', '').trim();
        if (kisbetus == szerzok)
            return konyv;
    });
    res.json(konyv);
};

const getKonyvKategoria = (req, res) => {
    let kategoria = req.params.kategoria.toLowerCase().replaceAll(' ', '');
    const konyv = konyvek.filter(konyv => {
        let kisbetus = konyv.category.toLowerCase().replaceAll(' ', '');
        if (kisbetus == kategoria)
            return konyv;
    });
    res.json(konyv);
};

const getKonyvekArfelett = (req, res) => {
    let paramAr = req.params.arfelett;
    let getKonyvekArfelett = konyvek.filter(konyv => konyv.price > paramAr)
    res.json(getKonyvekArfelett)
}

const getKonyvekByOldalszam = (req, res) => {
    const paramOldalszam = Number(req.params.paramOldalszam)
    const konyvekByOldalszam = konyvek.filter(konyv => konyv.pages < paramOldalszam)
    res.json(getKonyvekByOldalszam)
}

module.exports = {
    getkonyvek,
    getKonyvById,
    getKonyvekByar,
    getKonyvDarab,
    getKonyvByCim,
    getKonyvBySzerzo,
    getKonyvKategoria,
    getKonyvekArfelett,
    getKonyvekByOldalszam
}