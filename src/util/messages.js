module.exports = (lang = "en") => {
  const file_uploaded = {
    en: "File Upload successfully",
  };

  const success = {
    en: "success",
  };

  return {
    file_uploaded: file_uploaded[lang],
    success: success[lang],
  };
};
