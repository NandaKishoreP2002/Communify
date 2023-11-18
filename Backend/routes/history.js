const Mail = require("../models/mailSchema");
const { Router } = require("express")
const mongoose = require('mongoose');

const historyRouter = Router();


historyRouter.get('/mails/:from', (req, res) => {
    const { from } = req.params;
    console.log("inside history router", from);
    Mail.find({ from: from })
      .then((mails) => {
        console.log("router mails", mails);
        res.json({ mails });
      })
      .catch((error) => {
        console.error('Error fetching mails:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });


  module.exports = historyRouter