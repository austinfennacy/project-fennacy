const express = require('express')
const cors = require('cors')
const { Sequelize } = require('sequelize')
const { sequelize, Submittal, Address } = require('./models')
const config = require('./config/config.js')
const puppeteer = require('puppeteer')

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started on port ${PORT}`))

app.get('/getSubmittalPdf', async (req, res) => {
  const baseUrl = 'http://localhost:3000' // todofix - this will break when deployed
  
  const url = `${baseUrl}/submittalPdf/${req.query.id}`
  printPdf(url).then(pdf => {
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
    const submittals = await Submittal.findAll()
    
    return res.json(submittals)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.post('/submittal', async (req, res) => {
  const { 
    submittalNumber,
    numberRecommended,
    specificationSection,
    ahjRequired,
    ahjApproved,
    description,
    subcontractorSupplier,
    dateReceived,
    respondBefore,
    responseDate,
  } = req.body

  try {
    const submittal = await Submittal.create({ 
      submittalNumber,
      numberRecommended,
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
  const id = req.params.id
  
  try {
    const submittal = await Submittal.findOne({ where: { id } })

    submittal.dataValues.architectAddress = await submittal.getArchitectAddress()

    return res.json(submittal)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.put('/submittal/:id', async (req, res) => {
  const id = req.params.id
  const { 
    submittalNumber,
    numberRecommended,
    specificationSection,
    ahjRequired,
    ahjApproved,
    description,
    subcontractorSupplier,
    dateReceived,
    respondBefore,
    responseDate,
  } = req.body
  
  try {
    const submittal = await Submittal.findOne({ where: { id } })
    
    submittal.submittalNumber = submittalNumber
    submittal.numberRecommended = numberRecommended
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
  const id = req.params.id

  try {
    const numAddectedRows = await Submittal.destroy({
      where: {
        id: id,
      }
    })
    
    const recordDeletedSuccessfully = numAddectedRows == 1

    return res.json({ success: recordDeletedSuccessfully })
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.put('/submittal/updateProject/:id', async (req, res) => {
  const id = req.params.id
  const { 
    projectNumber,
    projectName,
  } = req.body

  try {
    const submittal = await Submittal.findOne({ where: { id } })
    
    submittal.projectNumber = projectNumber
    submittal.projectName = projectName

    await submittal.save()

    return res.json(submittal)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.put('/submittal/updateDescription/:id', async (req, res) => {
  const id = req.params.id
  const { 
    description,
  } = req.body

  try {
    const submittal = await Submittal.findOne({ where: { id } })
    
    submittal.description = description

    await submittal.save()

    return res.json(submittal)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.put('/submittal/updateSubSpec/:id', async (req, res) => {
  const id = req.params.id
  const { 
    submittalNumber,
    specificationNumber,
  } = req.body

  try {
    const submittal = await Submittal.findOne({ where: { id } })
    
    submittal.submittalNumber = submittalNumber
    submittal.specificationNumber = specificationNumber

    await submittal.save()

    return res.json(submittal)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.put('/submittal/updateAddress/:submittalId', async (req, res) => {
  const submittalId = req.params.submittalId

  const { 
    addressNameLine,
    addressLine1,
    city,
    state,
    zip,
    addressType,
  } = req.body

  
  architectAddressId = addressType == "architectAddress" ? submittalId : null
  contractorAddressId = addressType == "contractorAddress" ? submittalId : null
  projectAddressId = addressType == "projectAddress" ? submittalId : null
  
  try {
    const [address, created] = await Address.findOrCreate({ 
      where: {
        architectAddressId: architectAddressId,
        contractorAddressId: contractorAddressId,
        projectAddressId: projectAddressId,
      },
    })

    address.addressNameLine = addressNameLine
    address.addressLine1 = addressLine1
    address.city = city
    address.state = state
    address.zip = zip
    address.architectAddressId = architectAddressId
    address.contractorAddressId = contractorAddressId
    address.projectAddressId = projectAddressId

    address.save()

    return res.json(address)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

const db = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
    dialect: 'mysql'
  })

// comment out this block to prevent updates to the database schema
async function main() {
  // note - alter: true / force: true are not reccomended for production use,
  // need to consider migration system once deploying
  await sequelize.sync({ alter: true })
}
main()