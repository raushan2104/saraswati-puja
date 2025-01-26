const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const Listing = require("./models/listing.js");

const app = express();
const port = 3000;

// MongoDB Connection
const MONGO_URL = "mongodb://127.0.0.1:27017/spuja";
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Middleware
app.engine('ejs', ejsMate); // Use EJS Mate for layouts
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views")); // Set views directory
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(methodOverride("_method")); // Method override for PUT and DELETE

// Routes
app.get('/', (req, res) => {
  res.render('listings/index'); // Render index.ejs in listings folder
});

app.get('/show', async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/show", { allListings }); // Render show.ejs with data
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/listings/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await Listing.findById(id);
    res.render("listings/detail", { listing }); // Render detail.ejs
  } catch (error) {
    console.error("Error fetching listing:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/listings/:id/edit', async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing }); // Render edit.ejs
  } catch (error) {
    console.error("Error fetching listing for edit:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete('/listings/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Listing.findByIdAndDelete(id);
    res.redirect("/show");
  } catch (error) {
    console.error("Error deleting listing:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Contact Page Route
app.get('/contact', (req, res) => {
  res.render('listings/contact'); // Render contact.ejs
});

// Start the Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
