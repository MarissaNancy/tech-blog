// const sequelize = require('../config/connection');
// const { Post } = require('../models');
// console.log(Post);//
// const postData = require('./postData.json');
// const { User } = require('../models');
// const userData = require('./userData.json');
// // add comments too?

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
//     process.exit(0);
//     } catch (err){
//         console.log(err);
//     }
// };
// seedDatabase();
const sequelize = require('../config/connection');
const { Post } = require('../models');

const postSeedData = require('./postData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await Post.bulkCreate(postSeedData, {
        individualHooks: true,
        returning: true,
    });
    console.log('\n----- Sample blog -----\n');

    process.exit(0);
};

seedDatabase();