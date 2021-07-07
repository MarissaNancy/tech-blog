const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//user can have many post
// User.hasMany(Post, {
//     foreignKey: 'user_id'
// });
// //post belongs to user cascade when deleting bc it refrences it
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});
// //comment belongs to single user also deleting on cascade 
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

// Comment.belongsTo(Post, {
//     foreignKey: 'post_id',
//     onDelete: "cascade"
// });

// User.hasMany(Comment, {
//     foreignKey: 'user_id',
//     onDelete: "cascade"
// });

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: "cascade"
})
module.exports = { User, Post, Comment };

//main 6.22.21
