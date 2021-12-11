const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, Account, validateEmail) {
  const authenticateAccount = async (email, password, done) => {
    const isEmailValid = validateEmail(email)
    if (!isEmailValid) {
      done(null, false, { message: 'Email is not valid' })
    }

    const account = await Account.findOne({ where: { email } })

    if (account === null) {
      return done(null, false, { message: 'No user with that email' })
    }

    try {
      if (await bcrypt.compare(password, account.passwordHash)) {
        return done(null, account)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  const getAccountById = async (id) => {
    return Account.findOne({ where: { id } })
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateAccount))
  passport.serializeUser((account, done) => done(null, account.id))
  passport.deserializeUser((id, done) => {
    return done(null, getAccountById(id))
  })
}

module.exports = initialize
