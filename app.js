const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const path = require("path");

// settings
app.set("port", process.env.PORT || 4000);
const env = process.env.NODE_ENV;
console.log(env);
if (env !== "production") {
  app.use("/", express.static(`${__dirname}/frontend/public/`));
}
// middlewares
app.use(express.static(path.join(__dirname, "frontend", "build")));
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// routes
app.use("/api/cards", require("./routes/cards"));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});
module.exports = app;
