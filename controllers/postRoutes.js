const router = require("express").Router();
//require models what is needed from models
const { Post, User, Comment } = require("../models");
const sequelize = require("../config/connection");

router.get("/", (req, res) => {
  Post.findAll({
    attributes: [
      "id",
      "title",
      "content",
      "created_at"
    ],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "user_id", "post_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "user_id", "post_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id " });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req,res) =>{
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.usersession.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put("/:id", (req, res) =>{
  Post.update({
    title: req.body.title,
    content: req.body.content
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then(dbPostData => {
    if (!dbPostData){
      res.status(404).json({ message: 'No post with this id!' });
    }
    res.json(dbPostData);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
    Post.destroy({
        where: { id: req.params.id }
    })
    .then(dbPostData => {
        if (!dbPostData){
            res.status(404).json({ message: 'No post with this id'});
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;