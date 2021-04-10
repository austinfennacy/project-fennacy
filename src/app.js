const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const { sequelize, ShopDrawing } = require('./models');
const config = require('./config/config.js');

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

app.get('/shopDrawings', cors(), async (req, res) => {
  try {
    const shopDrawings = await ShopDrawing.findAll();
    
    return res.json(shopDrawings)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

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

app.get('/shopDrawing/:id', async (req, res) => {
  const id = req.params.id;
  
  try {
    const shopDrawing = await ShopDrawing.findOne({ where: { id } });
    
    return res.json(shopDrawing)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.put('/shopDrawing/:id', async (req, res) => {
  const id = req.params.id;
  const { shopDrawingNumber, description } = req.body;
  try {
    const shopDrawing = await ShopDrawing.findOne({ where: { id } });
    
    shopDrawing.shopDrawingNumber = shopDrawingNumber
    shopDrawing.description = description

    await shopDrawing.save()

    return res.json(shopDrawing)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.delete('/shopDrawing/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const numAddectedRows = await ShopDrawing.destroy({
      where: {
        id: id,
      }
    });
    
    const recordDeletedSuccessfully = numAddectedRows == 1;

    return res.json({ success: recordDeletedSuccessfully })
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

const db = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
    dialect: 'mysql'
  });

// comment out this block to prevent updates to the database schema
async function main() {
  // note - alter: true / force: true are not reccomended for production use,
  // need to consider migration system once deploying
  await sequelize.sync({ alter: true })
}
main()