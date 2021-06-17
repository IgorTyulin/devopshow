const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const mainPasswordPromise = bcrypt.hash(
  process.env.SHOPPING_MAIN_PASSWORD || 'password',
  12
)

const secret = process.env.SHOPPING_JWT_SECRET || 'jwtSecret'

exports.handler = async (event) => {
  const { password } = JSON.parse(event.body)
  const mainPassword = await mainPasswordPromise

  const valid = await bcrypt.compare(password, mainPassword)
  if (!valid) {
    return {
      statusCode: 500,
      body: 'Invalid password'
    }
  }
  const accessToken = jsonwebtoken.sign({}, secret, { expiresIn: '1000y' })
  const body = JSON.stringify(accessToken)

  return {
    token: {
      statusCode: 200,
      body
    }
  }
}
