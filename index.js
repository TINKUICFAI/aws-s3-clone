const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 9110;
const app = express();
app.use(express.static("public"));
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
const fileUpload = require("express-fileupload");

app.use(
  fileUpload({
    limits: { fileSize: 100000000 },
  })
);

app.use("/api", require("./src/routes"));

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
