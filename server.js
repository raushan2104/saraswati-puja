const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejsMate= require("ejs-mate");
const MONGO_URL = "mongodb://127.0.0.1:27017/spuja";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// Set EJS as templating engine
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.render('listings/index');
  // res.render('listings/index');
  // res.render('listings/index', { layout: 'layouts/boilerplate', title: 'Home' });



});

// event route

app.get("/show", async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/show", { allListings });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send("Internal Server Error");
  }
});

// immage details route
//Show Route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/detail.ejs", { listing });
});

// edit route
//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});


// // Handle contact form submission
// app.post('/contact', (req, res) => {
//   // Here you would typically handle the form submission
//   // For now, we'll just send back a success response
//   res.json({ message: 'Message received successfully!' });
// });

//Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/show");
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});