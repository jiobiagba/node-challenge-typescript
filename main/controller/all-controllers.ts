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

            if(result === null || result === undefined) {
                res.status(404).json({
                    msg: 'Key not found!!!'
                })
                return
            }

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
            
            if(result === null || result === undefined) {
                res.status(404).json({
                    msg: 'Key not found in store!!!'
                })
                return
            }

            const finalResult = result.find((item, index, array) => {
                        return item.timestamp <= time
                    })

            if(finalResult === null || finalResult === undefined) {
                res.status(404).json({
                    msg: 'No record of this key being saved before this time!!!'
                })
                return
            }

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
            const data: Document | any = new infoModel ({
                key: Object.keys(req.body)[0].trim(),
                value: Object.values(req.body)[0],
                timestamp: Date.now()
            })

            if(data.key === null || data.key === undefined || data.value === null || data.value === undefined) {
                res.status(400).json({
                    msg: 'Key AND value MUST be provided'
                })
                return
            }

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

    public static general(req: Request, res: Response) {
        res.status(400).json({
            msg: "This route does not exist!"
        })
    }
}