const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const { sequelize, Submittal } = require('./models');
const config = require('./config/config.js');

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

app.get('/submittals', cors(), async (req, res) => {
  try {
    const submittals = await Submittal.findAll();
    
    return res.json(submittals)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.post('/submittal', async (req, res) => {
  const { submittalNumber, description } = req.body

  try {
    const submittal = await Submittal.create({ submittalNumber, description })

    return res.json(submittal)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.get('/submittal/:id', async (req, res) => {
  const id = req.params.id;
  
  try {
    const submittal = await Submittal.findOne({ where: { id } });
    
    return res.json(submittal)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.put('/submittal/:id', async (req, res) => {
  const id = req.params.id;
  const { submittalNumber, description } = req.body;
  try {
    const submittal = await Submittal.findOne({ where: { id } });
    
    submittal.submittalNumber = submittalNumber
    submittal.description = description

    await submittal.save()

    return res.json(submittal)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.delete('/submittal/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const numAddectedRows = await Submittal.destroy({
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