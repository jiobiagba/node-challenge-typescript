import { Application } from "express"
import { Controller } from "../controller/all-controllers"
import { validated, dataValidator } from "../controller/pair-validator"


export class Router {
    public route(app: Application) {
        app.route('/').get(Controller.home)
        app.route('/api/v1/:object/:mykey').get(Controller.getOne)
        app.route('/api/v1/:object').post(dataValidator(), validated, Controller.postOne)
        app.route('*').all(Controller.general)
    }
}