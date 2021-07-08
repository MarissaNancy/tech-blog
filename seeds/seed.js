// const sequelize = require('../config/connection');
// const { Post, Comment, User } = require('../models');
// const post = require('./postData.json');
// const user = require('./userData.json');
// const comment = require('./commentData.json')

// const seedDatabase = async () => {
//     try {
//     await sequelize.sync({ force: true});
    
//     const post = await Post.bulkCreate(postData,{
//         individualHooks: true,
//         returning: true,
//     });
//     const user = await User.bulkCreate(userData,{
//         individualHooks: true,
//         returning: true,
//     });
//     const comment = await User.bulkCreate(commentData,{
//         individualHooks: true,
//         returning: true,
//     });
//     process.exit(0);
//     } catch (err){
//         console.log(err);
//     }
// };
// seedDatabase();

const sequelize = require('../config/connection');
const { Post, Comment, User } = require('../models');

const postData = require('./postData.json');
const commentData = require('./commentData.json');
const userData = require('./userData.json');

  const seedDatabase = () => {
    return sequelize.sync({ force: true }).then(() => {
      User.bulkCreate(userData, { individualHooks: true, returning: true,}).then(() => {
        Post.bulkCreate(postData).then(() => {
            Comment.bulkCreate(commentData).then(() => {
                console.log('All Seeds Planted');
              });
            });
      });
    })
    process.exit(0);
  };
seedDatabase();