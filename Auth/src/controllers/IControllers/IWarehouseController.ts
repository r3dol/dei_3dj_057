import { Request, Response, NextFunction } from 'express';

export default interface IWarehouseController  {
  
  createWarehouse(req: Request, res: Response, next: NextFunction)
  createWarehouseProlog(req: Request, res: Response, next: NextFunction)
  getAllWarehouse(req: Request, res: Response, next: NextFunction)
  getWarehouse(req: Request, res: Response, next: NextFunction)
  activateWarehouse(req: Request, res: Response, next: NextFunction)
  editWarehouse(req: Request, res: Response, next: NextFunction)
  editWarehouseProlog(req: Request, res: Response, next: NextFunction)
  getAllCities(req: Request, res: Response, next: NextFunction)
  
}