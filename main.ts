import Microservice from "./src/infrastructure";
import contactRouter from "./src/interface/http/routes/contact.routes";

new Microservice(3000)
  .setupMiddlewares()
  .setupRoutes([{ prefix: "/contact", route: contactRouter }])
  .run();
