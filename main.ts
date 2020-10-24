import { API } from './src/API'

if (!process.env.MONGO_URL) throw new Error('MONGO_URL is not set in ENV')
if (!process.env.MONGO_USER) throw new Error('MONGO_USER is not set in ENV')
if (!process.env.MONGO_PASS) throw new Error('MONGO_PASS is not set in ENV')

const api = new API(3000)

api.init()