const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

// store incoming events
const events = [];

app.get("/events", (req, res) => {
  res.send(events);
});

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  }); // posts service
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  }); // comments service
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message);
  }); // query service
  axios.post("http://localhost:4003/events", event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Event bus listening on port 4005");
});
