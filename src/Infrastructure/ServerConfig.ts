export default class ServerConfig {
    static SERVER_HOST: string =
      process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
        ? "127.0.0.1"
        : "0.0.0.0";
  
    static SERVER_PORT: string = process.env.PORT || "3000";
    static SERVER_TEST: string = "http://localhost:3030";
    // static MONGO_DB: string = process.env.NODE_ENV === "test" ? "test" : "my_app";
    // static MONGO_DB_URL: string = "mongodb://0.0.0.0:27017/";
    // static REDIS_HOST: string = "0.0.0.0";
    // static REDIS_PORT: string = process.env.REDIS_PORT || "6379";
    // // In seconds.
    // static REDIS_CACHE_TIMEOUT: number = 120;
  }
  