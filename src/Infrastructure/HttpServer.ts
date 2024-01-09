
import * as bodyParser from 'body-parser'
import * as http from 'http'
import { UserController } from 'Api/Controllers/UserController'
import express from 'express'
import AppDataSource from './DataSource'
import { error } from 'console'


export interface IControllers {
  user: UserController
}

export class HttpServer {
  private readonly app: express.Express
  private readonly router: express.Router
  private server: http.Server

  constructor(controllers: IControllers) {
    this.app = express()
    this.router = express.Router()
    HttpServer.runDataSource();

    this.router.post('/users', this.toHandler(controllers.user.createUser.bind(controllers.user)))

    this.app.use(bodyParser.json())
    this.app.use(this.router)
    this.app.use(HttpServer.handleError)
  }

  public async start(port: number) {
    this.server = this.app.listen(port, () => console.log(`server has started on ${port}`))
  }

  public async stop() {
    if (this.server) {
      this.server.close()
    }
  }

  private toHandler(fn) {
    return async (req, res, next) => {
      try {
        const result = await fn({ body: req.body, params: req.params })
        res.json(result)
      } catch (e) {
        next(e)
      }
    }
  }

  private static handleError(err, req, res, next) {
    res.status(500).json({ message: err.message })
  }

  private static runDataSource(){
    AppDataSource.initialize().then(() => {console.log("Data source initialized")}).catch(error => console.error(error))
  }
}