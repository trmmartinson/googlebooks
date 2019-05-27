const express = require("express");
const path = require("path");
axios = require ("axios");
const PORT = process.env.PORT || 3001;
const app = express();
var mongoose = require("mongoose")
var User = require("./userModel.js");


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
mongoose.connect("mongodb://localhost/tomdb2", { useNewUrlParser: true });   
// Define API routes here

// Send every other request to the React app
// Define any API routes before this runs
//app.get("*", (req, res) => {
  //res.sendFile(path.join(__dirname, "./client/build/index.html"));
//});
app.post("/books", (req, res) => {
  //console.log("qqqqqqq" + JSON.stringify(req.body));
  //console.log("title" + req.body.title);
  //console.log("authors" + req.body.authors);




  let tom1 = {
        authors: req.body.authors,
        title: req.body.title,
        image: req.body.image, 
        link : req.body.link,
        description: req.body.description}
  //.User.create(req.body)
  User.create(tom1)
  .then(function(dbUser) {
    // If saved successfully, send the the new User document to the client
    res.json(dbUser);
  })
  .catch(function(err) {
    // If an error occurs, send the error to the client
    res.json(err);
  });

});

app.get("/books", (req, res) => {
    User.find()
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    });
});
app.delete("/books/:id", (req, res) => {
  var id = req.params.id; 
  console.log("del:" + id)

  User.findByIdAndRemove(id, (err, book) => {
    console.log("delete :" + id)
    if (err) return res.status(500).send(err);
    const response = {
        message: "successfully deleted",
        id: book._id
    };
    return res.status(200).send(response);
});

  
});



app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
