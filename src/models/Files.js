const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const FilesSchema = new Schema(
  {
    file: {
      type: String,
      required: true,
    },
    bucketId: {
      type: Schema.Types.ObjectId,
      ref: "Bucket",
    },
  },
  { timestamps: true }
);

var Files = mongoose.model("Files", FilesSchema);

module.exports = Files;
