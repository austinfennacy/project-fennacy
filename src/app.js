const express = require('express')
const cors = require('cors')
const { Sequelize } = require('sequelize')
const { sequelize, Submittal, Address, User } = require('./models')
const config = require('./config/config.js')
const puppeteer = require('puppeteer')
const bcrypt = require('bcrypt')
const passport = require('passport')
const initializePassport = require('./passport-config')
const session = require('express-session')

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started on port ${PORT}`))

initializePassport(passport, User, validateEmail)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())

app.post('/register', async (req, res) => {
  const {
    name,
    email,
    password,
  } = req.body

  if (!name) {
    return res.json({ success: false, err: 'Name is required' })
  }
  if (!email) {
    return res.json({ success: false, err: 'Email is required' })
  }
  if (!password) {
    return res.json({ success: false, err: 'Password is required' })
  }

  const isEmailValid = validateEmail(email)
  if (!isEmailValid) {
    return res.json({ success: false, err: 'Email is not valid' })
  }

  const isEmailUnique = await User.findOne({ where: { email } })
    .then(user => user === null)
  if (!isEmailUnique) {
    return res.json({ success: false, err: 'That email is in use, try another' })
  }

  try {
    const passwordHash = await bcrypt.hash(password, 8)

    User.create({
      name,
      email,
      passwordHash,
      lastLoginAt: new Date(),
    })

    return res.json({ success: true })
  } catch (err) {
    console.error(`could not register account: ${err}`)
    return res.status(500).json({ success: false, err })
  }
})

function validateEmail (email) {
  const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return res.test(String(email).toLowerCase());
}

app.post('/login',
  async (req, res) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.json({ success: false, err: err.message })
      }

      if (!user) {
        return res.json({ success: false, err: info.message })
      }

      req.logIn(user, (err) => {
        if (err) {
          return res.json({ success: false, err: err.message })
        }

        // only share relevant info with client side
        const userInfo = {
          user: user.id,
          name: user.name,
          email: user.email,
        }

        return res.json({ success: true, user: userInfo })
      })
    })(req, res)
  })

app.delete('/logout', async (req, res) => {
  req.logOut()
  return res.json({ success: true })
})

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
    const userId = await req.user
      .then(user => user.dataValues.id)

    const submittals = await User.findOne({
      where: { id: userId },
      include: 'submittals'
    })
    .then(res => res.dataValues.submittals)

    return res.json({ success: true, submittals })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, err })
  }
})

app.post('/submittal', async (req, res) => {
  const UserId = await req.user
    .then(user => user.dataValues.id)

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
      UserId,
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

    const recordDeletedSuccessfully = numAddectedRows === 1

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

  architectAddressId = addressType === "architectAddress" ? submittalId : null
  contractorAddressId = addressType === "contractorAddress" ? submittalId : null
  projectAddressId = addressType === "projectAddress" ? submittalId : null

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

app.put('/submittal/updateCopies/:id', async (req, res) => {
  const id = req.params.id
  const {
    copiesForContractor,
    copiesForOwner,
    copiesForInspector,
    copiesForFile,
    copiesForOther,
    responseDate,
  } = req.body

  try {
    const submittal = await Submittal.findOne({ where: { id } })

    submittal.copiesForContractor = copiesForContractor
    submittal.copiesForOwner = copiesForOwner
    submittal.copiesForInspector = copiesForInspector
    submittal.copiesForFile = copiesForFile
    submittal.copiesForOther = copiesForOther
    submittal.responseDate = responseDate

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

app.post('/seedSubmittals', async (req, res) => {
  const UserId = await req.user
    .then(user => user.dataValues.id)

  const createPromises = getSubmittalsToSeed(UserId)

  try {
    Promise.all(createPromises)

    return res.json({ success: true })
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

function getSubmittalsToSeed(UserId) {
  const promises = []

  promises.push(Submittal.create({
    UserId,
    submittalNumber: '001',
    description: 'Storefronts & Hardware',
    specificationSection: 084100,
    ahjRequired: 1,
    ahjApproved: 0,
    subcontractorSupplier: 'Atascadero Glass',
    dateReceived: '2020-09-12',
    respondBefore: '2020-09-30',
    responseDate: '2021-09-21',
    projectNumber: '17100',
    projectName: 'FUSD McLane High School CTE',
    specificationNumber: '11082928',
    supplierName: 'Atascadero Glass',
    isSubstitutionUsed: 0,
    numberReceived: 1,
    contractorRemarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud',
    hasWarranty: 1,
    hasManuals: 0,
    floatTime: '2 months',
    submittalTaskNumber: '1143',
    earlyStartDate: '2021-08-02',
    earlyFinishDate: '2021-08-06',
    lateFinishDate: '2021-09-06',
    transmittedTo: 'FUSD',
    numberSent: 1,
    isDcNoExceptionTaken: 1,
    isDcNoExceptionTakenWithModificationNoted: 0,
    isDcAmmendAsNotedAndResubmit: 0,
    isDcRejectedAndResubmit: 0,
    isDcSeeAttachedLetter: 0,
    dcRemarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud',
    isArchitectNoExceptionTaken: 0,
    isArchitectNoExceptionTakenWithModificationNoted: 1,
    isArchitectAmmendAsNotedAndResubmit: 1,
    isArchitectRejectedAndResubmit: 0,
    architectRemarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud',
    isArchitectApprovedSubmission: 1,
    copiesForContractor: 1,
    copiesForOwner: 1,
    copiesForInspector: 3,
    copiesForFile: 1,
    copiesForOther: 0,
    architectAddress: {
      addressNameLine: 'Darden Architects',
      addressLine1: '6790 N. Wese Ave.',
      addressLine2: null,
      city: 'Fresno',
      state: 'CA',
      zip: 93711,
    },
    contractorAddress: {
      addressNameLine: 'John Doe Construction, Inc.',
      addressLine1: '4729 N. Blythe',
      addressLine2: null,
      city: 'Fresno',
      state: 'CA',
      zip: 93722,
    },
    projectAddress: {
      addressNameLine: 'FUSD McLane High School CTE',
      addressLine1: '2727 N. Cedar Ave.',
      addressLine2: null,
      city: 'Fresno',
      state: 'CA',
      zip: 93703,
    },
  }, {
    include: [{
      model: Address,
      as: 'architectAddress'
    },
    {
      model: Address,
      as: 'contractorAddress'
    },
    {
      model: Address,
      as: 'projectAddress'
    }]
  }))

  promises.push(Submittal.create({
    UserId,
    submittalNumber: 2,
    numberReceived: 3,
    // specificationSection,
    // ahjRequired,
    // ahjApproved,
    description: "test2",
    // subcontractorSupplier,
    // dateReceived,
    // respondBefore,
    // responseDate,
  }))

  return promises
}

const db = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
    dialect: 'mysql'
  })

// comment out this block to prevent updates to the database schema
async function main() {
  // note - alter: true / force: true are not reccomended for production use,
  // need to consider migration system once deploying
  // await sequelize.sync({ alter: true })
}
main()
