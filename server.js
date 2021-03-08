const express = require("express");
const app = express();

const path = require("path");
const portNumber = 3000;
const hbs = require("express-handlebars");
const { extname } = require("path");

app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, "public")));

//connect MongoDB Database
require("./server/database/database")();

//setup view engine
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultView: "default",
    layoutsDir: path.join(__dirname, "views"),
    partialsDir: path.join(__dirname, "views/partials"),
  })
);

//calling routes
app.use("/", require("./server/router/router"));

app.listen(3000, () => {
  console.log(`Server is started on http://localhost:${portNumber}`);
});
