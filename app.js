const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const axios = require("axios");

const User = require("./models/user");
const Book = require("./models/book");

const PORT = 4040;
const HOST = '0.0.0.0';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

app.post("/sign-up", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  newUser.save(function (err) {
    if (!err) {
      console.log("Add new user");
      res.redirect("/dashboard");
    } else {
      res.send(err);
    }
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.send("User not found");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.send("Password incorrect");
  }
  res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
  var nextBooks = [];
  var inProgressBooks = [];
  var finishedBooks = [];

  var books = Book.find((err, docs) => {
    if (err) {
      res.send(err.name);
    } else {
      nextBooks = docs.filter((book) => {
        return book.status == "TO READ";
      });

      inProgressBooks = docs.filter((book) => {
        return book.status == "READING";
      });

      finishedBooks = docs.filter((book) => {
        return book.status == "READED";
      });

      res.render("dashboard", {
        nextBooks,
        inProgressBooks,
        finishedBooks,
      });
    }
  });
});

app.post("/rate", (req, res) => {
  var rate = req.body.rate;
  var title = req.body.title;
  var author = req.body.author;

  Book.findOne({ title: title, author: author }, (err, docs) => {
    if (err) {
      console.log(err);
    }
    if (docs) {
      Book.findByIdAndUpdate(
        docs.id,
        {
          $set: {
            rate: rate,
          },
        },
        (err, doc) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  });
});

app.post("/insertABook", (req, res) => {
  var title = req.body.title;
  var author = req.body.author;
  var image = req.body.image;

  try {
    const book = Book.findOne({ title: title, author: author }, (err, docs) => {
      if (err) {
        console.log(err);
      }

      if (!docs) {
        const newBookRegister = new Book({
          title: title,
          author: author,
          image: image,
          password: req.body.password,
          status: "TO READ",
        });

        newBookRegister.save(function (err) {
          if (!err) {
            console.log("Add new book");
          } else {
            console.log(err);
          }
        });
      }
    });
  } catch (e) {}

  res.send("oi");
});

app.delete("/removeABook", (req, res) => {
  var title = req.body.title;
  var author = req.body.author;

  try {
    const user = Book.deleteOne({ title: title, author: author }, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (e) {
    console.log(e);
  }

  res.send({
    Status: res.status,
  });
});

app.post("/changeBookStatus", (req, res) => {
  var title = req.body.title;
  var author = req.body.author;

  try {
    const book = Book.findOne({ title: title, author: author }, (err, docs) => {
      if (err) {
        console.log(err);
      }

      if (docs.status == "TO READ") {
        Book.findByIdAndUpdate(
          docs.id,
          {
            $set: {
              status: "READING",
              startedAt: new Date(),
            },
          },
          (err, docs) => {
            if (err) {
              console.log(err);
            }
          }
        );
      } else if (docs.status == "READING") {
        Book.findByIdAndUpdate(
          docs.id,
          {
            $set: {
              status: "READED",
              finishedAt: new Date(),
            },
          },
          (err, docs) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    });
  } catch (e) {
    console.log(e);
  }
  res.redirect(`/dashboard`);
});

app.post("/dashboard/search", (req, res) => {
  var search = req.body.search;
  var apiKey = "AIzaSyBkFPEGW4C4kUBoR8KVT73jg1Pro3s0WBw";
  var url = `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${apiKey}`;
  var items = [];

  axios
    .get(url)
    .then((res) => {
      for (let i = 0; i < 10; i++) {
        if (!res.data.items[i].volumeInfo.imageLinks) {
          continue;
        }
        if (!res.data.items[i].volumeInfo.description) {
          continue;
        }
        items.push(res.data.items[i]);
      }
    })
    .catch((error) => {
      console.error(error);
    })
    .then(() => {
      res.render("search", {
        items: items,
      });
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
