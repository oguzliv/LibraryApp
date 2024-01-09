"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommonMiddleware_1 = __importDefault(require("../src/Api/Middlewares/CommonMiddleware"));
const ErrorHandlerMiddleware_1 = __importDefault(require("../src/Api/Middlewares/ErrorHandlerMiddleware"));
const UserRouter_1 = __importDefault(require("../src/Api/Routers/UserRouter"));
const CreateUser_1 = require("../src/Application/Usecases/Users/CreateUser");
const express_1 = __importDefault(require("express"));
const ServerConfig_1 = __importDefault(require("../src/Infrastructure/ServerConfig"));
const app = (0, express_1.default)();
const commonMiddleware = new CommonMiddleware_1.default(app);
const errorHandler = new ErrorHandlerMiddleware_1.default(app);
//User usecases
const createUser = new CreateUser_1.CreateUser();
// const db = new Mongo(app);
// const redis = new Cache(app);
// const redisMiddleware = new CacheMiddleware(app, redis.client);
const userRouter = new UserRouter_1.default(app, commonMiddleware, createUser);
const server = app.listen(parseInt(ServerConfig_1.default.SERVER_PORT), ServerConfig_1.default.SERVER_HOST, () => {
    const serverInfo = server.address();
    const host = serverInfo.address;
    const port = serverInfo.port;
    console.log(`Server ENV is ${process.env.NODE_ENV}`);
    console.log(`Server is listening at http://${host}:${port}`);
});
//# sourceMappingURL=index.js.map