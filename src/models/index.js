const mongoose = require("mongoose");

const url = process.env.LOCAL_MONGO_DB;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const con = mongoose.connection;
mongoose.set("debug", true);
con.on("open", () => {
  console.log("connected to database");
});
