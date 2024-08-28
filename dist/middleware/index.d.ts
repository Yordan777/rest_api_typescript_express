import { Request, Response, NextFunction } from "express";
export declare const handlenInputErrors: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
