require("dotenv").config();
const express = require("express");
const path = require("path");
const next = require("next");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileupload = require("express-fileupload");
//var bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(cookieParser());
    server.use(cors());
    server.use(
      fileupload({
        useTempFiles: true,
      })
    );

    const URI = process.env.MONGODB_URL;
    mongoose.connect(
      URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) throw err;
        console.log("Connected to MongoDB");
      }
    );

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
