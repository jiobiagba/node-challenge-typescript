import { Request, Response } from "express"
import { infoModel } from "../schema/kp-schema"
import { Gen } from "../handlers/res-handler"
import { Creator } from "../handlers/route-handler"

export class Controller {
    public static home(req: Request, res: Response) {
        const msg: string = "Abstraction worked part 2! We are now live! Controller working!"
        new Gen(200, msg).allSender(req, res)
    }

    public static async getOne(req: Request, res: Response) {
       new Creator(req, res, infoModel).GETOne()
    }

    public static async postOne(req: Request, res: Response) {
        new Creator(req, res, infoModel).POSTOne()
    }

    public static general(req: Request, res: Response) {
        const msg: string = "This route has not been created! Part 2"
        new Gen(400, msg).allSender(req, res)
    }
}