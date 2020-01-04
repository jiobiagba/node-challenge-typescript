import * as express from "express"

export class App {
    public app: express.Application
    
    constructor() {
        this.app = express()
        this.settings()
    }

    private settings(): void {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
    }
}