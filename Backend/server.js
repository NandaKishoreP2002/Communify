require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const userRouter = require("./routes/user");
const emailRouter = require("./routes/compose");
const historyRouter = require("./routes/history");
const session = require('express-session');
const cookieSession = require("cookie-session");
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
require("./passport");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const port = process.env.PORT || 8080;

const pass_word=process.env.password;

app.use(
  session({
      secret: "kishorE@2002",
      resave: false,
      saveUninitialized: false,
      cookie: {
          maxAge: 24 * 60 * 60 * 1000,
      },
  })
);


app.use(passport.initialize());
app.use(passport.session());

// _______________________

const url = "mongodb+srv://admin-nandu:"+pass_word+"@cluster0.kil1ki7.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.once("open", async () => {
  console.log("Connected to database");
});
    
mongoose.connection.on("error", (err) => {
  console.log("Error connecting to database  ", err);
});




// _____________________



app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use("/auth", authRoute);
app.use("/user", userRouter);
app.use("/compose", emailRouter);
app.use("/history", historyRouter);


app.listen(port, () => console.log(`Listenting on port ${port}...`));