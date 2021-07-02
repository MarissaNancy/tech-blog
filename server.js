// const path = require("path");
// const express = require("express");
// const session = require("express-session");
// const exphbs = require("express-handlebars");
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

//require routes 

// const routes = require("./controllers");

// const sequelize = require('./config/connection');

// const helpers = require('./utils/helpers');

// const app = express();
// const PORT = process.env.PORT || 3001;

// const sess = {
//   secret: "Super secret",
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize,
//   }),
// };

// app.use(session(sess));

// // Inform Express.js on which template engine to use
// const hbs = exphbs.create({ helpers });

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');