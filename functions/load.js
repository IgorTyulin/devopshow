const { MongoClient } = require('mongodb')

const connectionString =
  process.env.SHOPPING_DB_CONNECTION_STRING || 'mongodb://localhost:27017'

exports.handler = async () => {
  const client = await MongoClient.connect(connectionString, {
    useUnifiedTopology: true
  })

  try {
    const db = client.db('shopping')
    const found = await db
      .collection('shopping')
      .find({})
      .sort({ $natural: -1 })
      .toArray()
    const { items, sections } = found[0]
    const body = JSON.stringify({ items, sections })
    client.close()
    return {
      statusCode: 200,
      body
    }
  } catch (err) {
    client.close()
    return {
      statusCode: 500,
      body: err.message
    }
  }
}
