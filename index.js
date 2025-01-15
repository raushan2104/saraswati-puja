const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Set EJS as templating engine
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
// app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  const events = [
    {
      title: "Morning Puja",
      time: "7:00 AM - 9:00 AM",
      image: "/images/IMG-20250113-WA0026.png",
      description: "Traditional puja ceremony with mantras and offerings"
    },
    {
      title: "Cultural Performances",
      time: "10:00 AM - 1:00 PM",
      image: "/images/culturalp.png",
      description: "Students showcase their talents through music and dance"
    },
    {
      title: "Art Exhibition",
      time: "11:00 AM - 4:00 PM",
      image: "/images/art1.png",
      description: "Display of student artwork and traditional crafts"
    },
    {
      title: "Social Work",
      time: "1:00 PM - 2:00 PM",
      image: "/images/clean1.png",
      description: " Social Work Activities "
    }
  ];
  
  res.render('index', { events });


});

// Event Route
app.get('/events',(req,res){
  res.render('...')
})  

// Handle contact form submission
app.post('/contact', (req, res) => {
  // Here you would typically handle the form submission
  // For now, we'll just send back a success response
  res.json({ message: 'Message received successfully!' });
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});