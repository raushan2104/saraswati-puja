require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const MONGO_URL = process.env.MONGO_DB_URI;

main()
  .then(() => {
    console.log(process.env.MONGO_DB_URI)
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// Set EJS as templating engine
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.render('listings/index');




});

// event route

app.get("/show", async (req, res) => {
  try {
    console.time("Fetching Listings"); // Start timing

    const allListings = await Listing.find({})
      .select('title image _id')  // Select only essential fields
      .limit(50)
      .lean();

    console.timeEnd("Fetching Listings"); // End timing and log duration

    console.log(`Fetched ${allListings.length} listings.`); // Log how many items were fetched

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



//Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/show");
});

app.get('/contact', (req, res) => {
  res.render('listings/contact');
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});