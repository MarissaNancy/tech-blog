const router = require("express").Router();
// const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
// const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.render("dashboard");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [{ model: User }, { model: Comment }],
    });
    const posts = postData.get({ plain: true });
    res.render("dashboard", {
      posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/edit/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User }],
    });
    const post = postData.get({ plain: true });
    res.render("edit", {
      post,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/edit", async (req, res) => {
  try {
    res.render("edit");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
