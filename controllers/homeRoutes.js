const sequalize = require("../config/connection");
const router = require("express").Router();
const { Post, User, Comment } = require("../models");

router.get("/", (req, res) => {
  Post.findAll({
    attributes: [
      "id",
      "title",
      "content",
      //created at but where does that come from
    ],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        //id commenttext userid postid
        attributes: ["id", "comment_text", "user_id", "post_id"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((PostData) => {
      const posts = PostData.get;
      console.log(posts);
      res.render({ Post });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "content"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "user_id", "post_id"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((PostData) => {
      if (!PostData) {
        res.status(404).json({ message: "No post with this id" });
        return;
      }
      const post = PostData.get;
      console.log(post);
      res.render("singlepost", { Post });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }
  res.render("login");
});
