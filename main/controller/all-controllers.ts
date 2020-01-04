import { Request, Response } from "express"

export class Controller {
    public static home(req: Request, res: Response) {
        res.status(200).json({
            message: "We are now live with controller working!"
        })
    }
    public static getOne(req: Request, res: Response) {
        res.status(200).json({
            message: "This will handle GET requests without timestamps."
        })
    }

    public static getWithTimestamp(req: Request, res: Response) {
        res.status(200).json({
            message: "This will handle GET requests with timestamps"
        })
    }

    public static postOne(req: Request, res: Response) {
        res.status(200).json({
            message: "This will handle POST requests"
        })
    }
}