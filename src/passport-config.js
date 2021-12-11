const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, User, validateEmail) {
  const authenticateUser = async (email, password, done) => {
    const isEmailValid = validateEmail(email)
    if (!isEmailValid) {
      done(null, false, { message: 'Email is not valid' })
    }

    const user = await User.findOne({ where: { email } })

    if (user === null) {
      return done(null, false, { message: 'No account with that email' })
    }

    try {
      if (await bcrypt.compare(password, user.passwordHash)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  const getUserById = async (id) => {
    return User.findOne({ where: { id } })
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize
