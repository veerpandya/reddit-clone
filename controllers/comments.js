const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports = function (app) {
  // CREATE Comment
  app.post("/posts/:postId/comments", function (req, res) {
    const comment = new Comment(req.body);
    comment.author = req.user._id;
    comment
      .save()
      .then((comment) => {
        return Promise.all([Post.findById(req.params.postId)]);
      })
      .then(([post, user]) => {
        post.comments.unshift(comment);
        return Promise.all([post.save()]);
      })
      .then((post) => {
        res.redirect(`/posts/${req.params.postId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
