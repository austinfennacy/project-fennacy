const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const { sequelize, ShopDrawing } = require('./models');
const config = require('./config/config.js');

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

app.post('/shopDrawing', async (req, res) => {
  const { shopDrawingNumber, description } = req.body

  try {
    const shopDrawing = await ShopDrawing.create({ shopDrawingNumber, description })

    return res.json(shopDrawing)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.get('/shopDrawings', cors(), async (req, res) => {
  try {
    const shopDrawings = await ShopDrawing.findAll();
    
    return res.json(shopDrawings)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})


app.get('/shopDrawing/:id', async (req, res) => {
  const idParam = req.params.id;

  try {
    const shopDrawing = await ShopDrawing.findAll({
      where: {
        id: idParam,
      }
    });

    return res.json(shopDrawing)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

const db = new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    dialect: 'mysql'
  });

// db.authenticate()
//   .then(() => console.log('db connected...'))
//   .catch(err => console.log('error: ' + err));

// async function main() {
//   // note - alter: true / force: true are not reccomended for production use
//   await sequelize.sync({ alter: true })
// }

// main()