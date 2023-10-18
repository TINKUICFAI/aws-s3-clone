const fileRouter = require("express").Router();
const FileController = require("../controllers/FileController");
const BucketsController = require("../controllers/BucketsController");
const BucketValidator = require("../validators/BucketValidator");
const ErrorHandlerMiddleware = require("../middlewares/ErrorHandlerMiddleware");
const ResponseMiddleware = require("../middlewares/ResponseMiddleware");

/**
 * Buckets
 */

fileRouter.post(
  "/",
  ErrorHandlerMiddleware(BucketsController().addBucket),
  ResponseMiddleware
);

fileRouter.get(
  "/",
  ErrorHandlerMiddleware(BucketsController().bucketList),
  ResponseMiddleware
);

fileRouter.delete(
  "/:id",
  ErrorHandlerMiddleware(BucketsController().deleteBucket),
  ResponseMiddleware
);

/**Files */
fileRouter.post(
  "/:id/uploads",
  ErrorHandlerMiddleware(FileController().uploadFile),
  ResponseMiddleware
);

fileRouter.get(
  "/:id/uploads",
  ErrorHandlerMiddleware(FileController().filesList),
  ResponseMiddleware
);

fileRouter.get(
  "/:id/uploads/:fileId",
  ErrorHandlerMiddleware(FileController().fileDetail),
  ResponseMiddleware
);

fileRouter.put(
  "/:id/uploads/:fileId",
  ErrorHandlerMiddleware(FileController().updateFile),
  ResponseMiddleware
);

fileRouter.delete(
  "/:id/uploads/:fileId",
  ErrorHandlerMiddleware(FileController().removeFile),
  ResponseMiddleware
);

module.exports = fileRouter;
