import { Request, Response } from "express"
import { infoModel } from "../schema/kp-schema"

export class Controller {
    public static home(req: Request, res: Response) {
        res.status(200).json({
            message: "We are now live with controller working!"
        })
    }
    public static async getOne(req: Request, res: Response) {
        try {
            const key = req.params.mykey
            const result =  await infoModel.findOne({ key: key }).sort({ timestamp: -1 })
            console.log(`GET result: \n${result}`)
            res.status(200).json(result)
        }
        catch (err) {
            res.status(500).json({
                msg: err
            })
        }
    }

    public static getWithTimestamp(req: Request, res: Response) {
        res.status(200).json({
            message: "This will handle GET requests with timestamps"
        })
    }

    public static async postOne(req: Request, res: Response) {
        try{
            const data = new infoModel ({
                key: Object.keys(req.body)[0],
                value: Object.values(req.body)[0],
                timestamp: Date.now()
            })

            const feedback = await data.save()
            console.log(`POST DATA: \n${feedback}`)
            res.status(200).json(feedback)
        }
        catch (err) {
            res.status(500).json({
                msg: err
            })
        }
    }
}