import * as express from "express"
import { Router } from "./routes/router"

export class App {
    public app: express.Application
    public router: Router = new Router()
    
    constructor() {
        this.app = express()
        this.settings()
        this.router.route(this.app)
        this.router.routeTimestamp(this.app)
    }

    private settings(): void {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
    }
}