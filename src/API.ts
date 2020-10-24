import express from 'express'
const app = express()

export class API {

  constructor(private port: number) { }

  public init(): void {
    app.set('json spaces', 2)

    this.registerEndpoints()
  }

  private registerEndpoints() {
    app.get('/status', (req, res) => {
      res.json({ 'status': '!help | Ichika' })
    })
    app.listen(this.port, () => console.log(`Listening on *:${this.port}`))
  }
}