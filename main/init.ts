import * as http from "http"
import { App } from "./app"

const app = new App().app,
        PORT: number | string = process.env.PORT || 1010,
        server = http.createServer(app)
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`)
})