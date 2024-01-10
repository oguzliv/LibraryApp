
import * as bodyParser from 'body-parser'
import * as http from 'http'
import { UserController } from 'Api/Controllers/UserController'
import express from 'express'
import AppDataSource from './DataSource'
import { error } from 'console'
import { BookController } from 'Api/Controllers/BookController'
import { BorrowingController } from 'Api/Controllers/BorrowingController'


export interface IControllers {
  user: UserController
  book: BookController
  borrow: BorrowingController
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
    this.router.get('/users', this.toHandler(controllers.user.getUsers.bind(controllers.user)))

    this.router.post('/books', this.toHandler(controllers.book.createBook.bind(controllers.book)))
    this.router.get('/books', this.toHandler(controllers.book.getBooks.bind(controllers.book)))
    this.router.get('/books/:id', this.toHandler(controllers.book.getBookById.bind(controllers.book)))

    this.router.post('/users/:userid/borrow/:bookid',this.toHandler(controllers.borrow.borrowBook.bind(controllers.borrow)))
    this.router.post('/users/:userid/return/:bookid',this.toHandler(controllers.borrow.returnBook.bind(controllers.borrow)))

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