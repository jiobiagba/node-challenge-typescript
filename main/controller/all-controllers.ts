import { Request, Response } from "express"
import { infoModel } from "../schema/kp-schema"
import { Gen } from "../handlers/res-handler"

export class Controller {
    public static home(req: Request, res: Response) {
        const msg: string = "Abstraction worked part 2! We are now live! Controller working!"
        new Gen(200, msg).allSender(req, res)
    }

    public static async getOne(req: Request, res: Response) {
        try {
            const key = req.params.mykey
            const result =  await infoModel.findOne({ key: key }).sort({ timestamp: -1 })

            if(result === null || result === undefined) {
                new Gen(404, "Key not found").allSender(req, res)
                return
            }

            new Gen(200, result).resSender(req, res)
        }
        catch (err) {
            new Gen(500, err).allSender(req, res)
        }
    }

    public static async getWithTimestamp(req: Request, res: Response) {
        try {
            const time = req.params.timestamp,
                    key = req.params.mykey,
                    result: Document[] | any = await infoModel.find({ key: key }).sort({ timestamp: -1 })
            
            if(result === null || result === undefined) {
                new Gen(404, "Key not found in store").allSender(req, res)
                return
            }

            const finalResult = result.find((item: any, index: number, array: []) => {
                        return item.timestamp <= time
                    })

            if(finalResult === null || finalResult === undefined) {
                new Gen(404, "No record of this key being saved before this time").allSender(req, res)
                return
            }

            new Gen(200, finalResult).resSender(req, res)
        }
        catch (err) {
            new Gen(500, err).allSender(req, res)
        }
    }

    public static async postOne(req: Request, res: Response) {
        try{
            const data: Document | any = new infoModel ({
                key: Object.keys(req.body)[0],
                value: Object.values(req.body)[0],
                timestamp: Date.now()
            })

            if(data.key === null || data.key === undefined || data.value === null || data.value === undefined) {
                new Gen(400, 'Key AND value MUST be provided').allSender(req, res)
                return
            }

            const feedback = await data.save()
            new Gen(200, feedback).resSender(req, res)
        }
        catch (err) {
            new Gen(500, err).allSender(req, res)
        }
    }

    public static general(req: Request, res: Response) {
        const msg: string = "This route has not been created! Part 2"
        new Gen(400, msg).allSender(req, res)
    }
}