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

    public static async getWithTimestamp(req: Request, res: Response) {
        try {
            const time = req.params.timestamp,
                    key = req.params.mykey,
                    result: Document[] | any = await infoModel.find({ key: key }).sort({ timestamp: -1 })

            console.log(`All GET results: \n${result}`)

            const finalResult = result.find((item, index, array) => {
                        return item.timestamp <= time
                    })
            console.log(`GET with Timestamp result: \n${finalResult}`)
            res.status(200).json(finalResult)

        }
        catch (err) {
            res.status(500).json({
                msg: err
            })
        }
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