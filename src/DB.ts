import { Collection, Db, MongoClient } from 'mongodb'
import Logger from '@bwatton/logger'

export class DB {

  private logger: Logger = new Logger('DB')

  private db!: Db

  private statuses!: Collection
  private responses!: Collection

  constructor(
    private mongoUrl: string,
    private mongoUser: string,
    private mongoPass: string,
    private mongoDb: string,
  ) { }

  public async init() {
    const client = await MongoClient.connect(
      this.mongoUrl, {
      auth: {
        user: this.mongoUser,
        password: this.mongoPass,
      },
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    this.db = client.db(this.mongoDb)

    this.logger.info(`Connected to MongoDB with DB ${this.mongoDb}`)

    this.statuses = this.db.collection('statuses')
    this.responses = this.db.collection('responses')
  }

  public async getStatuses() {
    let statuses = await this.statuses.find().toArray()

    return statuses
  }

  public async getResponses() {
    let responses = await this.responses.find().toArray()

    return responses
  }
}