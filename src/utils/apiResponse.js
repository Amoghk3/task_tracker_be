const success = (data, meta = {}) => ({
  success: true,
  data,
  meta,
});

const error = (message) => ({
  success: false,
  error: message,
});

module.exports = { success, error };