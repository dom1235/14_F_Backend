const express = require("express");
const app = express()
const PORT = 3030;

//ez kell ahhoz hogy request bodyt tudjak kuldeni
app.use(express.json());

app.get("/", (req, res) =>{
    res.status(418).json({info: "Könyvek backend alkalmazás"})
})

app.listen(PORT, () => {
    console.log("Szerver elinduult a " + PORT + "-on")
});
