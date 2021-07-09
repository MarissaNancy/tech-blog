const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/:id',
    async (req, res) => {
        try {
            const userData = await User.findByPk(req.params.id);
            const user = userData.get({ plain: true });
            res.render('dashboard', user);
        } catch (err) {
            res.status(500).json(err);
        }
    });

// this will create a new user at signup
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.logged_in = true;
            req.session.user_id = userData.id;
            res.status(200).json(userData);
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// this will login an exisiting user
router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { username: req.body.username } });
      
      if (!userData) {
        res
          .status(400)
          .json({ message: 'User not found.' });
        return;
      }
  
      const validPassword = await userData.checkpw(req.body.password);
      console.log (validPassword + "-----------> LOOK HERE!!!!!!!!!!!");
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect password. Try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'Success!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

// this will log out an existing user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;