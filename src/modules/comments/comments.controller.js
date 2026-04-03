const commentService = require("./comments.service");

// ADD
const addComment = async (req, res) => {
  try {
    const comment = await commentService.addComment(
      req.params.taskId,
      req.body.body,
      req.user.userId
    );

    res.status(201).json({
      success: true,
      data: comment,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// GET
const getComments = async (req, res) => {
  try {
    const comments = await commentService.getComments(
      req.params.taskId,
      req.user.userId
    );

    res.json({
      success: true,
      data: comments,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// DELETE
const deleteComment = async (req, res) => {
  try {
    await commentService.deleteComment(
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
  addComment,
  getComments,
  deleteComment,
};