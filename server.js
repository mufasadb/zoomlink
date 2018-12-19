const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const link = require("./link.js");


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var links = link.listLinks();
//get
app.get('/api', (req, res) => {
  const links = link.listLinks();
  res.json(links);
});


//post for slack webhook
app.post('/webhook', (req, res) => {
  let incText = req.body.text;
  let incUser = req.body.user_name;
  let message = '';
  if (incText == 'start') {
    let results = link.addBooking(links, incUser);
    message = results.message
    links = results.list
  } else if (incText == 'end') {
    let results = link.removeBooking(links, incUser);
    message = results.message
  } else if (incText == 'booked'){
    let results = link.Booked(links);
    message = results.message 
  } else if (incText == 'help'){
    message = "You can start a zoom link with /zoomlink start \nYou can end a zoomlink with /zoomlink end\nYou can see who has the zoom links booked with /zoomlink booked"
  }
  else {
    message = "I'm  sorry, " + incUser + " I don't understand that command, try /zoomlink help for a list of commands"
  }
  let data = {
    text: message,
  }
  console.log(links);
  res.json(data);
});


//run server
const port = process.env.PORT||5000;
app.listen(port, () => `Server running on port ${port}`);
