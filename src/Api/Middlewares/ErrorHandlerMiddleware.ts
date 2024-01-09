import express from "express";
import { Request, Response, NextFunction } from "express";

export default class ErrorHandler {
  private app: express.Application;

  constructor(app: express.Application) {
    this.app = app;
    this.applyMiddlewares();
  }

  // Apply appwise middleware.
  private applyMiddlewares() {
    this.app.use(this.logErrors);
    this.app.use(this.xhrErrorHandler);
    this.app.use(this.errorPageHandler);
  }

  // Just print the error and jump to the next error middleware.
  private logErrors(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    next(err);
  }

  // If xhr in progress return 500 else jump to the next error middleware.
  private xhrErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (req.xhr) {
      res.status(500).send({ error: err.stack });
    } else {
      next(err);
    }
  }

  // Render the error page with a 500 response code.
  private errorPageHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    res.status(500);
    res.render("error", { error: err.stack });
  }
}
