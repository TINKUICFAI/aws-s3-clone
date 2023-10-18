const Buckets = require("../models/Buckets");

module.exports = () => {
  const addBuckets = (data) => {
    console.log("BucketsService => addBuckets");
    return new Promise(function (resolve, reject) {
      Buckets.create(data).then(resolve).catch(reject);
    });
  };

  const fetch = (id) => {
    console.log("BucketsService => fetch");
    return new Promise(function (resolve, reject) {
      let orm = Buckets.findById(id);
      orm.then(resolve).catch(reject);
    });
  };

  const fetchByQuery = (query) => {
    console.log("BucketsService => fetchByQuery");
    return new Promise(function (resolve, reject) {
      let orm = Buckets.findOne(query).select("-password");

      orm.then(resolve).catch(reject);
    });
  };

  const deleteBuckets = (id) => {
    console.log("BucketsService => deleteBuckets");
    return new Promise(function (resolve, reject) {
      let orm = Buckets.deleteOne({ _id: id });
      orm.then(resolve).catch(reject);
    });
  };

  const updateBuckets = (BucketsId, data) => {
    console.log("BucketsService => updateBuckets");
    return new Promise(async function (resolve, reject) {
      await Buckets.findByIdAndUpdate({ _id: BucketsId }, data)
        .then(resolve)
        .catch(reject);
    });
  };

  const getBuckets = (query, page, limit) => {
    console.log("BucketsService => getBuckets");

    if (page) {
      page -= 1;
    }

    return new Promise(function (resolve, reject) {
      let orm = Buckets.find(query)
        .sort({ _id: -1 })
        .skip(page * limit)
        .limit(limit);
      orm.then(resolve).catch(reject);
    });
  };

  const countBuckets = (query) => {
    console.log("BucketsService => countBuckets");
    return new Promise(function (resolve, reject) {
      let orm = Buckets.countDocuments(query);
      orm.then(resolve).catch(reject);
    });
  };

  return {
    addBuckets,
    fetch,
    fetchByQuery,
    deleteBuckets,
    updateBuckets,
    getBuckets,
    countBuckets,
  };
};
