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

const getEvUtaniKonyvek = (req, res) => {
    const paramEvszam = Number(req.params.evszam)
    const konyvekEvszamUtan = konyvek.filter(konyv => konyv.year)
}

const createKonyv = (req, res) => {

   
    const { title, author, category, year, pages, price } = req.body;

    let maxId = 0;
    const azonositok = konyvek.map(konyv => konyv.id);
    for (let i = 0; i < azonositok.length; i++) {
        if (azonositok[i] > maxId) {
            maxId = azonositok[i];
        }
    }
    let views = 0;
    let id = maxId + 1;
    let konyv = {
        id,
        title,
        author,
        category,
        year,
        pages,
        price,
        views
    };
    konyvek.push(konyv);
    res.status(201).json(konyv);
};


const updatekonyv =(req, res) => {
    const {id} = req.params;
    const { title, author, category, year, pages, price } = req.body;
    //title author category string
    //yearpagesprice number

    if (typeof title !== "string" || 
        typeof author !== "string" || 
        typeof category !== "string" || 
        typeof year !== "number" || 
        typeof pages !== "number" || 
        typeof price !== "number")
    {
        return res.status(400).json({message: "nem jol adtad meg"})
    }

    const konyv = konyvek.find(konyv => konyv.id == Number(id))

    konyv.title = title;
    konyv.author = author;
    konyv.category = category;
    konyv.year = year;
    konyv.pages = pages;
    konyv.price = price;

    console.log(konyv)
    res.json({message : "hellyoszia"})
}

const removeKonyv = (req, res) => {
    const { id } = req.params;    
    const index = konyvek.findIndex(konyv => konyv.id == Number(id));
    //ha nincs ilyen idju mkonyv akkor visszaterunk egy üzenetel hogy nme letezik
    //nem elérhető vagy már törölték!
    if (index === -1)
    {
        return res.status(404).json({message:"nem elérhető vagy már törölték!"})
    }

    const toroltKonyv = konyvek.splice(index, 1);

    res.json({message: "helloszia"});
};




module.exports = {
    getkonyvek,
    getKonyvById,
    getKonyvekByar,
    getKonyvDarab,
    getKonyvByCim,
    getKonyvBySzerzo,
    getKonyvKategoria,
    getKonyvekArfelett,
    getKonyvekByOldalszam,
    getEvUtaniKonyvek,
    createKonyv,
    updatekonyv,
    removeKonyv
}