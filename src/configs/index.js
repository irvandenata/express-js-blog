const dotenv = require('dotenv');
const path = require('path');
dotenv.config()
module.exports = {
  serviceName: process.env.SERVICE_NAME,
  urlDB: process.env.MONGO_URL
}