const { MongoClient } = require('mongodb')

const connectionString =
  process.env.SHOPPING_DB_CONNECTION_STRING || 'mongodb://localhost:27017'

exports.handler = async (event) => {
  const { sections, items } = JSON.parse(event.body)
  const client = await MongoClient.connect(connectionString, {
    useUnifiedTopology: true
  })

  try {
    const db = client.db('shopping')
    await db.collection('shopping').insertOne({ sections, items })
    client.close()
    return {
      token: {
        statusCode: 200
      }
    }
  } catch (err) {
    client.close()
    return {
      statusCode: 500,
      body: err.message
    }
  }
}
