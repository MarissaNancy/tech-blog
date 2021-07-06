const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] } //dblcheck syntax
    })
    .then(UserData => res.json(UserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.params.id },
    include: [{
        model: Post,
        attributes: [ 'id', 'title', 'content']
    },
    {
        model: Comment,
        attributes: ['id', 'comment_text'],
        include: {
            model: Post,
            attributes: ['title']
        }
    },
    {
        model: Post,
        attributes: ['title'],
    }
    ]
    })
    .then(UserData => {
        if (!UserData) {
            res.status(404).json({ message: 'No user found' });
            return;
        }
        res.json(UserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(UserData => {
        req.session.save(() => {
            req.session.user_id = UserData.id;
            req.session.username = UserData.username;
            req.session.loggedIn = true;//

            res.json(UserData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) =>{
    User.update(req.body, {
        individualHooks: true,
        where: { id: req.params.id }
    })
    .then(UserData => {
        if(!UserData[0]){
            res.status(404).json({ message: 'No user found with this id'})
            return;
        }
        res.json(UserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res ) => {
    User.destroy({
        where: { id : req.params.id }
    })
    .then(UserData => {
        if (!UserData){
            res.status(404).json({ message: 'No user found with id'});
            return;
        }
        res.json(UserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;