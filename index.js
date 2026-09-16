const express = require("express");
const app = express()
const PORT = 3030;

const { getkonyvek,
        getKonyvById,
        getKonyvekByar,
        getKonyvDarab,
        getKonyvByCim,
        getKonyvBySzerzo,
        getKonyvKategoria,
        getKonyvekArfelett,
        getKonyvekByOldalszam
        
 } = require("./services/konyvekservice");
//ez kell ahhoz hogy request bodyt tudjak kuldeni
app.use(express.json());

app.get("/", (req, res) =>{
    res.status(200).json({info: "Könyvek backend alkalmazás"})
})

// routes
app.get("/konyvek", getkonyvek)
app.get("/konyvek/db", getKonyvDarab)
app.get("/konyvek/:id", getKonyvById)
app.get("/konyvek/ar/:ar", getKonyvekByar)
app.get("/konyvek/cim/:cim", getKonyvByCim)
app.get("/konyvek/szerzo/:szerzo",getKonyvBySzerzo);
app.get("/konyvek/kategoria/:kategoria", getKonyvKategoria)
app.get("/konyvek/arfelett/:arfelett",getKonyvekArfelett)
app.get("/konyvek/oldalszam/:olszaldszam",getKonyvekByOldalszam)



app.listen(PORT, () => {
    console.log("Szerver elinduult a " + PORT + "-on")
});