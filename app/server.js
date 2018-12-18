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
    links = resuts.list
  }
  } else if (incText == 'end') {
    let results = link.removeBooking(links, incUser);
    if (results[0][results[1]] != null) {
      links = results[0];
      let selectedLink = results[1];
      message = "Thanks, " + incUser + " I've logged you out of the zoom link " + links[selectedLink].name
    } else {
      message = results[2];
    }
  } else if (incText == 'booked'){
    let results = link.Booked(links);
    message = results.message 
  }
  else {
    message = "I'm  sorry, " + incUser + " I don't understand that command"
  }
  let data = {
    text: message,
  }
  console.log(links);
  res.json(data);
});


//run server
const port = 5000;
app.listen(port, () => `Server running on port ${port}`);
