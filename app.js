const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');
const bcrypt = require('bcrypt');


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (request, response) => {
    response.render('home');
});


app.get('/sign', (req, res) => {
    res.render('sign-up');
});

app.post('/register', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    newUser.save(function(err) {
        if (!err){
          console.log("Add new user");
          res.redirect('/login');
        } else {
          res.send(err);
        }
      });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.send("User not found");
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.send("Password incorrect");
    }

    res.redirect(`/dashboard/${user.id}`);
});

app.get('/dashboard/:userId', (req, res) => {
   res.render('dashboard');
});

app.listen(3030, () => {
    console.log('Server up on 3000');
});