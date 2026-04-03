const validate = (schema) => (req, res, next) => {
  try {
    const result = schema.parse(req.body);

    req.body = result;

    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.errors?.[0]?.message || "Validation failed",
    });
  }
};

module.exports = validate;