const BucketService = require("../services/BucketService");
const FileService = require("../services/FileService");
const RegexEscape = require("regex-escape");

module.exports = () => {
  const addBucket = async (req, res, next) => {
    console.log("BucketController => addBucket");

    let { bucketName } = req.body;

    let bucket = await BucketService().fetchByQuery({ bucketName });

    if (bucket) {
      return res.status(400).send({
        code: 0,
        msg: "Bucket already exists",
        data: {},
      });
    }
    bucket = await BucketService().addBuckets(req.body);

    req.rData = bucket;

    req.msg = "success";
    next();
  };

  const bucketList = async (req, res, next) => {
    console.log("BucketController => bucketList");
    let { search, page, limit } = req.query;

    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : 10;

    let query = {};

    if (search) {
      query.bucketName = { $regex: RegexEscape(search), $options: "i" };
    }

    let buckets = await BucketService().getBuckets(query, page, limit);

    let total = await BucketService().countBuckets(query);

    req.msg = "success";
    req.rData = {
      search,
      page,
      limit,
      total,
      buckets,
    };

    next();
  };

  const deleteBucket = async (req, res, next) => {
    console.log("BucketController => deleteBucket");
    let { id } = req.params;

    await BucketService().deleteBuckets(id);
    await FileService().deleteMultipleFiles({ id });
    req.msg = "success";
    next();
  };

  return { addBucket, bucketList, deleteBucket };
};
