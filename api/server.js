"use strict";

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

//models
const Task = require("./Task");
const Token = require("./Token");

mongoose.connect("mongodb://localhost:27017/Bloomme-Manager-API", {
  useNewUrlParser: true,
  useCreateIndex: true //indexes are created for datas
});

mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Task API
app.get("/api/tasks/list", (req, res) => {
  Task.find({})
    .sort({ updatedAt: "descending" })
    .exec((err, tasks) => {
      if (err) return res.status(404).send("Error while getting tasks!");

      return res.send({ tasks });
    });
});

app.post("/api/tasks/create", (req, res) => {
  const task = new Task({
    question: req.body.question,
    tokenPairs: req.body.tokenPairs
  });
  task.save(err => {
    if (err) return res.status(404).send({ message: err.message });

    return res.send({ task });
  });
});

app.post("/api/tasks/update/:id", (req, res) => {
  Task.findByIdAndUpdate(
    req.params.id,
    req.body.data,
    { new: true },
    (err, task) => {
      console.log(req.body.data);
      if (err) return res.status(404).send({ message: err.message });
      return res.send({ message: "task updated!", task });
    }
  );
});

app.post("/api/tasks/delete/:id", (req, res) => {
  Task.findByIdAndRemove(req.params.id, err => {
    if (err) return res.status(404).send({ message: err.message });
    return res.send({ message: "task deleted!" });
  });
});

//Token API

app.get("/api/tokens/list", (req, res) => {
  Token.find({})
    .sort({ updatedAt: "descending" })
    .exec((err, tokens) => {
      if (err) return res.status(404).send("Error while getting token!");

      return res.send({ tokens });
    });
});

app.post("/api/tokens/create", (req, res) => {
  const token = new Token({
    title: req.body.title,
    value: req.body.value
  });
  token.save(err => {
    if (err) return res.status(404).send({ message: err.message });

    return res.send({ token });
  });
});

app.post("/api/tokens/delete/:id", (req, res) => {
  Token.findByIdAndRemove(req.params.id, err => {
    if (err) return res.status(404).send({ message: err.message });
    return res.send({ message: "token deleted!" });
  });
});

const PORT = 5000;

app.listen(PORT);
console.log("api runnging on port " + PORT + ": ");
