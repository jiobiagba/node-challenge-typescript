import { Application } from "express"
import { Controller } from "../controller/all-controllers"

export class Router {
    public route(app: Application) {
        app.route('/').get(Controller.home)
        app.route('/api/v1/:object/:mykey').get(Controller.getOne)
        app.route('/api/v1/:object').post(Controller.postOne)
    }
    public routeTimestamp(app: Application) {
        app.route('/timestamp/api/v1/:object/:mykey/:timestamp').get(Controller.getWithTimestamp)
    }
    public noRoute(app: Application) {
        app.route('*').all(Controller.general)
    }
}