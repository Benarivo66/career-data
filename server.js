const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const db = require("./db/connect");
const usersRoute = require("./routes/user");
const careersRoute = require("./routes/career");

const corsOptions = {
  origin: [process.env.HOST], 
  optionsSuccessStatus: 200, 
};

app.use(cors(corsOptions));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get("/", (req, res, next) => {
    res.send("Welcome to the career data home page")
});
app.use("/users", usersRoute)
app.use("/careers", careersRoute)

const host = process.env.HOST;

app.listen(process.env.HOST, () => {
  console.log(`app listening on ${host}`);
  db.init();
});
