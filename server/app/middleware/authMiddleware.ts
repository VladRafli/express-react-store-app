import { NextFunction, Request, Response } from "express";

/**
 * Authenticate 
 */
export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization')

    // if (token !== undefined) {
        
    // }
    
}