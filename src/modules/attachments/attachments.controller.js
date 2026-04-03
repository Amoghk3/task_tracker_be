const attachmentService = require("./attachments.service");

// UPLOAD
const uploadFile = async (req, res) => {
  try {
    const attachment = await attachmentService.addAttachment(
      req.params.taskId,
      req.file,
      req.user.userId
    );

    res.status(201).json({
      success: true,
      data: attachment,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// DELETE
const deleteFile = async (req, res) => {
  try {
    await attachmentService.deleteAttachment(
      req.params.id,
      req.user.userId
    );

    res.json({ success: true });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  uploadFile,
  deleteFile,
};