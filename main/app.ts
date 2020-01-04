import * as express from "express"
import { Router } from "./routes/router"
import { MongooseConnect } from "./schema/mongoose-setup"

export class App {
    public app: express.Application
    private router: Router = new Router()
    private mongoose: MongooseConnect = new MongooseConnect()
    
    constructor() {
        this.app = express()
        this.mongoose
        this.settings()
        this.router.route(this.app)
        this.router.routeTimestamp(this.app)
    }

    private settings(): void {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
    }
}