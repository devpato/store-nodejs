const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error.js');
const app = express();
const sequelize = require('./util/db');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
