import { Request, Response } from "express"

export class Gen {
    private status: number
    private msg: any

    constructor (status: number, msg: any) {
        this.status = status
        this.msg = msg
    }

    public resSender(req?: Request, res?: Response) {
        res.status(this.status).json(this.msg)
    }

    public allSender(req?: Request, res?: Response) {
        res.status(this.status).json({
            msg: this.msg
        })
    }
}