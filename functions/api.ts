import ServerlessHttp from 'serverless-http'
import app from '../src/index'
import router from '../src/routes'

app.use('/.netlify/functions/api/', router())

const handler = ServerlessHttp(app)
module.exports.handler = async (event, context) => {
  const result = await handler(event, context)
  return result
}

//https://answers.netlify.com/t/making-mongoose-work-with-express/72703/3
