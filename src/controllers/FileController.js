const FileService = require("../services/FileService");
const BucketService = require("../services/BucketService");
const fs = require("fs");
module.exports = () => {
  const uploadFile = async (req, res, next) => {
    let { id } = req.params;
    if (!req.files || !req.files.file) {
      return res.status(400).send("No files were uploaded.");
    }
    const file = req.files.file;

    let files = [];

    // Upload multiple files at once
    if (file.length > 0) {
      for (const item of file) {
        var fileName = item.name;

        let d = new Date();
        fileName =
          d.getDate() +
          "-" +
          (d.getMonth() + 1) +
          "-" +
          d.getFullYear() +
          "-" +
          d.getHours() +
          "_" +
          d.getMinutes() +
          fileName;

        let fName = `http://localhost:9000/${fileName}`;
        await FileService().addFiles({ file: fName, bucketId: id });
        files.push({ file: fName });

        item.mv("./public/" + fileName, (err) => {
          return res.status(500).send(err);
        });
      }
    }
    // Upload single file
    else {
      var fileName = file.name;
      let d = new Date();
      fileName =
        d.getDate() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getFullYear() +
        "-" +
        d.getHours() +
        "_" +
        d.getMinutes() +
        fileName;

      let fName = `http://localhost:9000/${fileName}`;
      await FileService().addFiles({ file: fName, bucketId: id });

      files.push({ file: fName });
      file.mv("./public/" + fileName, (err) => {
        return res.status(500).send(err);
      });
    }
    res.send({ msg: "File uploaded!", data: { files } });
  };

  const filesList = async (req, res, next) => {
    console.log("BucketController => filesList");
    let { id, page, limit } = req.params;

    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : 10;

    let query = { bucketId: id };

    let files = await FileService().getFiles(query, page, limit);

    let total = await FileService().countFiles(query);

    req.msg = "success";
    req.rData = {
      page,
      limit,
      total,
      files,
    };

    next();
  };

  const fileDetail = async (req, res, next) => {
    console.log("BucketController => fileDetail");

    let { id, fileId } = req.params;

    let bucket = await BucketService().fetch(id);

    if (!bucket) {
      return res.status(400).send({ msg: "Bucket not found", data: {} });
    }

    let file = await FileService().fetch(fileId);

    if (!file) {
      return res.status(400).send({ msg: "File not found", data: {} });
    }

    return res.send({ msg: "File update successfully!", data: file });

    // next();
  };

  const updateFile = async (req, res, next) => {
    console.log("BucketController => updateFile");

    let { id, fileId } = req.params;

    let bucket = await BucketService().fetch(id);

    if (!bucket) {
      return res.status(400).send({ msg: "Bucket not found", data: {} });
    }

    let file = await FileService().fetch(fileId);

    if (!file) {
      return res.status(400).send({ msg: "File not found", data: {} });
    }

    let filePath = file.file;
    filePath = filePath.split("9000/")[1];
    filePath = "./public/" + filePath;
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Delete the file
      fs.unlink(filePath, async (err) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .send({ msg: "Failed to delete the file", data: {} });
        }
      });

      const file = req.files.file;

      var fileName = file.name;
      let d = new Date();
      fileName =
        d.getDate() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getFullYear() +
        "-" +
        d.getHours() +
        "_" +
        d.getMinutes() +
        fileName;

      let fName = `http://localhost:9000/${fileName}`;
      await FileService().updateFiles(fileId, { file: fName, bucketId: id });

      file.mv("./public/" + fileName, (err) => {
        return res.status(500).send(err);
      });

      return res.send({ msg: "File update successfully!", data: {} });
    } else {
      return res.status(400).send({ msg: "File not found", data: {} });
    }

    // next();
  };

  const removeFile = async (req, res, next) => {
    console.log("BucketController => removeFile");

    let { id, fileId } = req.params;

    let bucket = await BucketService().fetch(id);

    if (!bucket) {
      return res.status(400).send({ msg: "Bucket not found", data: {} });
    }

    let file = await FileService().fetch(fileId);

    if (!file) {
      return res.status(400).send({ msg: "File not found", data: {} });
    }

    let filePath = file.file;
    filePath = filePath.split("9000/")[1];
    filePath = "./public/" + filePath;
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Delete the file
      fs.unlink(filePath, async (err) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .send({ msg: "Failed to delete the file", data: {} });
        }

        await FileService().deleteFiles(fileId);
        res.status(200).send({ msg: "File deleted successfully", data: {} });
      });
    } else {
      return res.status(400).send({ msg: "File not found", data: {} });
    }

    // next();
  };

  return { uploadFile, filesList, removeFile, updateFile, fileDetail };
};
