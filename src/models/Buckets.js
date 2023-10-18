const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const BucketSchema = new Schema(
  {
    bucketName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

var Bucket = mongoose.model("Bucket", BucketSchema);

module.exports = Bucket;
