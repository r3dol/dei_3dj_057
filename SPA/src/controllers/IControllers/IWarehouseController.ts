import { Request, Response, NextFunction } from 'express';

export default interface IWarehouseController  {
  
  createWarehouse(req: Request, res: Response, next: NextFunction)
  getAllWarehouse(req: Request, res: Response, next: NextFunction)
  
}