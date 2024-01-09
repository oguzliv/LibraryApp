import express from "express";
import { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

export default class CommonMiddleware {
  private app: express.Application;

  constructor(app: express.Application) {
    this.app = app;
    this.applyMiddlewares();
  }

  // Apply common and necessary appwise middlewares.
  private applyMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  public queryPageLimitCheck(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (
      req.query.limit &&
      req.query.page &&
      Number(req.query.limit) >= 0 &&
      Number(req.query.page) >= 0
    ) {
      req.query.page = String(Number(req.query.page) - 1);
      next();
    } else {
      res.status(400).send("This page and limit parameters are not valid.");
    }
  }

  public querySeasonCheck(req: Request, res: Response, next: NextFunction) {
    if (
      req.query.season &&
      (req.query.season === "1718" || req.query.season === "1819")
    )
      next();
    else res.status(400).send("Season parameter is invalid.");
  }
}
