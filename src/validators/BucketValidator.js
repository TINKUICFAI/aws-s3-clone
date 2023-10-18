const { Validator } = require("node-input-validator");
const { validate, validations } = require("./index");

module.exports = () => {
  const validateBucket = async (req, res, next) => {
    const v = new Validator(req.body, {
      bucketName: validations.general.requiredString,
    });

    validate(v, res, next, req);
  };

  const validateAddBucket = async (req, res, next) => {
    const v = new Validator(req.body, {
      bucketName: validations.bucket.bucketName,
    });

    validate(v, res, next, req);
  };

  const validateBucketId = async (req, res, next) => {
    let { id } = req.params;

    if (id) {
      req.body.bucketId = id;
    }

    const v = new Validator(req.params, {
      id: validations.bucket.id,
    });

    validate(v, res, next, req);
  };

  return {
    validateBucket,
    validateBucketId,
    validateAddBucket,
  };
};
