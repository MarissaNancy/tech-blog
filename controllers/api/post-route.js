const router = require('express').Router();
//require models what is needed from models
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            //id title content
            'id',
            'title',
            'content'
        ],
        include : [{
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            //id commenttext userid postid
            attributes: ['id', 'comment_text', 'user_id', 'post_id'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
    ]
    })
    .then((PostData) => res.json(PostData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});