import * as rest from 'restify';
import {Controller} from "../controllers/controller";

export default class App {

    private app: rest.Server;
    private port: number;

    constructor(controllers: Controller[], port: number)
    {
        this.app = rest.createServer();
        this.port = port;
    }

    initControllers(controllers: Controller[])
    {
        controllers.forEach( controller => {
            controller.initRoute();
        });
    }

    listen()
    {
        this.app.listen(this.port, () => console.log(`Server running on ${this.port}`));
    }
}