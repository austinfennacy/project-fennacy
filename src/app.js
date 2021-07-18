const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const { sequelize, Submittal } = require('./models');
const config = require('./config/config.js');
const puppeteer = require('puppeteer');

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

app.get('/screenshot', async (req, res) => {
  printPdf(req.query.url).then(pdf => {
    res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
    res.send(pdf)
  })
})

async function printPdf(url) {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(url, {waitUntil: 'networkidle0'})
  
  const pdf = await page.pdf({ format: 'A4' })
  await browser.close()
  
  return pdf
}

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
  const { 
    submittalNumber,
    numberReccomended,
    specificationSection,
    ahjRequired,
    ahjApproved,
    description,
    subcontractorSupplier,
    dateReceived,
    respondBefore,
    responseDate,
  } = req.body;

  try {
    const submittal = await Submittal.create({ 
      submittalNumber,
      numberReccomended,
      specificationSection,
      ahjRequired,
      ahjApproved,
      description,
      subcontractorSupplier,
      dateReceived,
      respondBefore,
      responseDate,
    })

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
  const { 
    submittalNumber,
    numberReccomended,
    specificationSection,
    ahjRequired,
    ahjApproved,
    description,
    subcontractorSupplier,
    dateReceived,
    respondBefore,
    responseDate,
  } = req.body;
  
  try {
    const submittal = await Submittal.findOne({ where: { id } });
    
    submittal.submittalNumber = submittalNumber
    submittal.numberReccomended = numberReccomended
    submittal.specificationSection = specificationSection
    submittal.ahjRequired = ahjRequired
    submittal.ahjApproved = ahjApproved
    submittal.description = description
    submittal.subcontractorSupplier = subcontractorSupplier
    submittal.dateReceived = dateReceived
    submittal.respondBefore = respondBefore
    submittal.responseDate = responseDate

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