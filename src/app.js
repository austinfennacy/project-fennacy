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
    numberReceived,
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
      numberReceived,
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
    submittal.dataValues.projectAddress = await submittal.getProjectAddress()
    submittal.dataValues.contractorAddress = await submittal.getContractorAddress()

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
    numberReceived,
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
    submittal.numberReceived = numberReceived
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

app.put('/submittal/updateSupplier/:id', async (req, res) => {
  const id = req.params.id
  const { 
    supplierName,
  } = req.body

  try {
    const submittal = await Submittal.findOne({ where: { id } })
    
    submittal.supplierName = supplierName

    await submittal.save()

    return res.json(submittal)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.put('/submittal/updateSubstitution/:id', async (req, res) => {
  const id = req.params.id
  const { 
    isSubstitutionUsed,
  } = req.body

  try {
    const submittal = await Submittal.findOne({ where: { id } })
    
    submittal.isSubstitutionUsed = isSubstitutionUsed

    await submittal.save()

    return res.json(submittal)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.put('/submittal/updateWarranty/:id', async (req, res) => {
  const id = req.params.id
  const { 
    hasWarranty,
    hasManuals,
  } = req.body

  try {
    const submittal = await Submittal.findOne({ where: { id } })
    
    submittal.hasWarranty = hasWarranty
    submittal.hasManuals = hasManuals

    await submittal.save()

    return res.json(submittal)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.put('/submittal/updateReceivedInfo/:id', async (req, res) => {
  const id = req.params.id
  const { 
    dateReceived,
    numberReceived,
    responseDate,
  } = req.body

  try {
    const submittal = await Submittal.findOne({ where: { id } })
    
    submittal.dateReceived = dateReceived
    submittal.numberReceived = numberReceived
    submittal.responseDate = responseDate

    await submittal.save()

    return res.json(submittal)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.put('/submittal/updateContractorRemarks/:id', async (req, res) => {
  const id = req.params.id
  const { 
    contractorRemarks,
  } = req.body

  try {
    const submittal = await Submittal.findOne({ where: { id } })
    
    submittal.contractorRemarks = contractorRemarks

    await submittal.save()

    return res.json(submittal)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.put('/submittal/updateDcRemarks/:id', async (req, res) => {
  const id = req.params.id
  const { 
    dcRemarks,
  } = req.body

  try {
    const submittal = await Submittal.findOne({ where: { id } })
    
    submittal.dcRemarks = dcRemarks

    await submittal.save()

    return res.json(submittal)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.put('/submittal/updateArchitectRemarks/:id', async (req, res) => {
  const id = req.params.id
  const { 
    architectRemarks,
  } = req.body

  try {
    const submittal = await Submittal.findOne({ where: { id } })
    
    submittal.architectRemarks = architectRemarks

    await submittal.save()

    return res.json(submittal)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.put('/submittal/updateTimeline/:id', async (req, res) => {
  const id = req.params.id
  const { 
    earlyStartDate,
    earlyFinishDate,
    lateFinishDate,
  } = req.body

  try {
    const submittal = await Submittal.findOne({ where: { id } })
    
    submittal.earlyStartDate = earlyStartDate
    submittal.earlyFinishDate = earlyFinishDate
    submittal.lateFinishDate = lateFinishDate

    await submittal.save()

    return res.json(submittal)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.put('/submittal/updateFloat/:id', async (req, res) => {
  const id = req.params.id
  const { 
    floatTime,
    submittalTaskNumber,
  } = req.body

  try {
    const submittal = await Submittal.findOne({ where: { id } })
    
    submittal.floatTime = floatTime
    submittal.submittalTaskNumber = submittalTaskNumber

    await submittal.save()

    return res.json(submittal)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.put('/submittal/updateTransmitted/:id', async (req, res) => {
  const id = req.params.id
  const { 
    transmittedTo,
    responseDate,
  } = req.body

  try {
    const submittal = await Submittal.findOne({ where: { id } })
    
    submittal.transmittedTo = transmittedTo
    submittal.responseDate = responseDate

    await submittal.save()

    return res.json(submittal)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.put('/submittal/updateSent/:id', async (req, res) => {
  const id = req.params.id
  const { 
    transmittedTo,
    numberSent,
  } = req.body

  try {
    const submittal = await Submittal.findOne({ where: { id } })
    
    submittal.transmittedTo = transmittedTo
    submittal.numberSent = numberSent

    await submittal.save()

    return res.json(submittal)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.put('/submittal/updateDcActions/:id', async (req, res) => {
  const id = req.params.id
  const { 
    isDcNoExceptionTaken,
    isDcNoExceptionTakenWithModificationNoted,
    isDcAmmendAsNotedAndResubmit,
    isDcRejectedAndResubmit,
    isDcSeeAttachedLetter,
  } = req.body

  try {
    const submittal = await Submittal.findOne({ where: { id } })
    
    submittal.isDcNoExceptionTaken = isDcNoExceptionTaken
    submittal.isDcNoExceptionTakenWithModificationNoted = isDcNoExceptionTakenWithModificationNoted
    submittal.isDcAmmendAsNotedAndResubmit = isDcAmmendAsNotedAndResubmit
    submittal.isDcRejectedAndResubmit = isDcRejectedAndResubmit
    submittal.isDcSeeAttachedLetter = isDcSeeAttachedLetter

    await submittal.save()

    return res.json(submittal)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.put('/submittal/updateArchitect/:id', async (req, res) => {
  const id = req.params.id
  const { 
    isArchitectNoExceptionTaken,
    isArchitectNoExceptionTakenWithModificationNoted,
    isArchitectAmmendAsNotedAndResubmit,
    isArchitectRejectedAndResubmit,
    isArchitectApprovedSubmission,
  } = req.body

  try {
    const submittal = await Submittal.findOne({ where: { id } })
    
    submittal.isArchitectNoExceptionTaken = isArchitectNoExceptionTaken
    submittal.isArchitectNoExceptionTakenWithModificationNoted = isArchitectNoExceptionTakenWithModificationNoted
    submittal.isArchitectAmmendAsNotedAndResubmit = isArchitectAmmendAsNotedAndResubmit
    submittal.isArchitectRejectedAndResubmit = isArchitectRejectedAndResubmit
    submittal.isArchitectApprovedSubmission = isArchitectApprovedSubmission

    await submittal.save()

    return res.json(submittal)
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