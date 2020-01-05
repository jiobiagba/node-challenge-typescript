import * as http from "http"
import { App } from "./app"

const app = new App().app,
        PORT: number | string = process.env.PORT || 1010,
        server = http.createServer(app)

const power = ():void => {
    server.listen(PORT, ():void => {
        console.log(`Server running on port ${PORT}!`)
    })
}

if(require.main === module) {
    power()
} else {
    exports.starter = power
}