const express = require("express");
const bodyParser = require("body-parser");
const { response } = require("express");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", (request, response) => {
    response.render("home");
});


app.get("/sign", (request, response) => {
    response.render("sign-up");
});

app.post("/", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    console.log(name, email, password);

});

app.listen(3030, () => {
    console.log("Server up on 3000");
});