const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "client")));
app.get("/", (req, res) => {
    res.render("index");
});

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));
