const express = require("express");
const app = express()
const PORT = 3030;

const { getkonyvek,
        getKonyvById
 } = require("./services/konyvekservice");
//ez kell ahhoz hogy request bodyt tudjak kuldeni
app.use(express.json());

app.get("/", (req, res) =>{
    res.status(200).json({info: "Könyvek backend alkalmazás"})
})

// routes
app.get("/konyvek", getkonyvek)
app.get("/konyvek/:id", getKonyvById)

app.listen(PORT, () => {
    console.log("Szerver elinduult a " + PORT + "-on")
});