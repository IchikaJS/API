import Logger from '@bwatton/logger'
import { DB } from './DB'

import express from 'express'
import bodyParser from 'body-parser'

export class API {

  private logger: Logger = new Logger('API')
  public db: DB

  public app: express.Application

  constructor(private port: number) {
    this.db = new DB(
      process.env.MONGO_URL,
      process.env.MONGO_USER,
      process.env.MONGO_PASS,
      'ichika'
    )
    this.app = express()
  }

  public async init() {
    await this.db.init()

    this.app.use(bodyParser.json())
    this.app.listen(this.port, () => this.logger.info(`Listening on *:${this.port}`))

    this.initEndpoints()
  }

  private async initEndpoints() {
    this.app.get('/statuses', async (req, res) => {
      res.json({ statuses: await this.db.getStatuses() })
    })
    this.app.get('/responses', async (req, res) => {
      res.json({ responses: await this.db.getResponses() })
    })
  }
}