const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
router.use('/user', userRoutes);//dblcheck these
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;