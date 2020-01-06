import { body, sanitizeBody, validationResult } from "express-validator"
import { Request, Response, NextFunction } from "express"

export const dataValidator: any = (): any => {
    return [
        body('*').isLength({ min: 1 }).trim().isAlphanumeric().withMessage('Key - Value pairs can only have alphanumeric values and CANNOT be empty.'),
        sanitizeBody('*').escape()
    ]
}

export const validated: any = (req: Request, res: Response, next: NextFunction) => {
    const err = validationResult(req)
    if(err.isEmpty()) {
        return next()
    }

    const errorArray: any[] = []

    err.array().map(err => errorArray.push({ [err.param]: err.msg }))

    return res.status(400).json({
        msg: errorArray
    })
}