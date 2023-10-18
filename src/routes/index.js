const router = require("express").Router();

router.use("/buckets", require("./files"));

module.exports = router;
