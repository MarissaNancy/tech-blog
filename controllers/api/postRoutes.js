const router = require("express").Router();
//require models what is needed from models
const { Post, User, Comment } = require("../../models");
const sequelize = require("../../config/connection");

router.get("/", (req, res) => {
  Post.findAll({
    attributes: [
      //id title content
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
    .then((PostData) => res.json(PostData))
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
    attributes: ["id", "title", "content"],
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
      if (!PostData) {
        res.status(404).json({ message: "No post found with this id " });
        return;
      }
      res.json(PostData);
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
        user: req.usersession.user_id//
    })
    .then(PostData => res.json(PostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Post.destroy({
        where: { id: req.params.id }
    })
    .then(PostData => {
        if (!PostData){
            res.status(404).json({ message: 'No post with this id'});
        }
        res.json(PostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;