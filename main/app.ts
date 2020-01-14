import * as express from "express"
import { Router } from "./routes/router"
import { MongooseConnect } from "./schema/mongoose-setup"
import * as cors from "cors"
import * as helmet from "helmet"
import * as compression from "compression"

const corsOptions = {
    origin: "http://localhost:9099",
    methods: "GET,POST,PUT,DELETE",
    optionsSuccessStatus: 200
}

export class App {
    public app: express.Application
    private router: Router = new Router()
    private mongoose: MongooseConnect = new MongooseConnect()
    
    constructor() {
        this.app = express()
        this.mongoose
        this.settings()
        this.router.route(this.app)
    }

    private settings(): void {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(helmet())
        this.app.use(compression())
        this.app.use(cors(corsOptions))
    }
}