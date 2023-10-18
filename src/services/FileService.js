const Files = require("../models/Files");

module.exports = () => {
  const addFiles = (data) => {
    console.log("FilesService => addFiles");
    return new Promise(function (resolve, reject) {
      Files.create(data).then(resolve).catch(reject);
    });
  };

  const fetch = (id) => {
    console.log("FilesService => fetch");
    return new Promise(function (resolve, reject) {
      let orm = Files.findById(id);
      orm.then(resolve).catch(reject);
    });
  };

  const fetchByQuery = (query) => {
    console.log("FilesService => fetchByQuery");
    return new Promise(function (resolve, reject) {
      let orm = Files.findOne(query).select("-password");

      orm.then(resolve).catch(reject);
    });
  };

  const deleteFiles = (id) => {
    console.log("FilesService => deleteFiles");
    return new Promise(function (resolve, reject) {
      let orm = Files.deleteOne({ _id: id });
      orm.then(resolve).catch(reject);
    });
  };

  const updateFiles = (FilesId, data) => {
    console.log("FilesService => updateFiles");
    return new Promise(async function (resolve, reject) {
      await Files.findByIdAndUpdate({ _id: FilesId }, data)
        .then(resolve)
        .catch(reject);
    });
  };

  const getFiles = (query, page, limit) => {
    console.log("FilesService => getFiles");

    if (page) {
      page -= 1;
    }
    return new Promise(function (resolve, reject) {
      let orm = Files.find(query)
        .sort({ _id: -1 })
        .skip(page * limit)
        .limit(limit);
      orm.then(resolve).catch(reject);
    });
  };

  const countFiles = (query) => {
    console.log("FilesService => countFiles");
    return new Promise(function (resolve, reject) {
      let orm = Files.countDocuments(query);
      orm.then(resolve).catch(reject);
    });
  };

  const deleteMultipleFiles = (query) => {
    return new Promise(function (resolve, reject) {
      let orm = Files.deleteMany(query);
      orm.then(resolve).catch(reject);
    });
  };
  return {
    addFiles,
    fetch,
    fetchByQuery,
    deleteFiles,
    updateFiles,
    getFiles,
    countFiles,
    deleteMultipleFiles,
  };
};
