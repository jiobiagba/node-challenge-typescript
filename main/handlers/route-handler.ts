import { Model, Document } from "mongoose"
import { Request, Response } from "express"
import { Gen } from "../handlers/res-handler"

interface controllerInputs {
    req: Request,
    res: Response,
    model: Model<Document>,
    params?: string
    params2?: string
}

export class Creator implements controllerInputs {
    public req: Request
    public res: Response
    public model: Model<Document>
    public params?: string
    public params2?: string

    constructor(req: Request, res: Response, model: Model<Document>) {
        this.req = req,
        this.res = res,
        this.model = model,
        this.params = req.params.mykey
        this.params2 = req.params.timestamp
    }

    public async GETOne() {
        try {
            const result = await this.model.findOne({ key: this.params }).sort({ timestamp: -1 })

            if(result === null || result === undefined) {
                new Gen(404, "Key not found").allSender(this.req, this.res)
                return
            }

            new Gen(200, result).resSender(this.req, this.res)
        }
        catch (err) {
            new Gen(500, err).allSender(this.req, this.res)
        }
    }

    public async GETOneTime() {
        try {
            const result: Document[] | any = await this.model.find({ key: this.params }).sort({ timestamp: -1 })
            if(result === null || result === undefined) {
                new Gen(404, "Key not found in store").allSender(this.req, this.res)
                return
            }

            const finalResult = result.find((item: any, index: number, arr: []) => {
                return item.timestamp <= this.params2
            })

            if(finalResult === null || finalResult === undefined) {
                new Gen(404, "No record of this key being saved before this time").allSender(this.req, this.res)
                return
            }

            new Gen(200, finalResult).resSender(this.req, this.res)
        }
        catch (err) {
            new Gen(500, err).allSender(this.req, this.res)
        }
    }

    public async POSTOne() {
        try {
            const data: Document | any = new this.model ({
                key: Object.keys(this.req.body)[0],
                value: Object.values(this.req.body)[0],
                timestamp: Date.now()
            })

            if(data.key === null || data.key === undefined || data.value === null || data.value === undefined) {
                new Gen(400, 'Key AND value MUST be provided').allSender(this.req, this.res)
                return
            }

            console.log(`POST Data: \n${data}`)

            const feedback = await data.save()
            new Gen(200, feedback).resSender(this.req, this.res)
        }
        catch (err) {
            new Gen(500, err).allSender(this.req, this.res)
        }
    }

}