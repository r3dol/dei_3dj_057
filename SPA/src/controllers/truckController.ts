import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';
import ITruckController from "./IControllers/ITruckController";
import fetch from 'node-fetch';

@Service()
export default class TruckController implements ITruckController {
  constructor() {}

  async createTruck(req: Request, res: Response, next: NextFunction) {
    const url = 'http://localhost:3000/api/truck/';
    const data = req.body;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if(response.status != 201){
      res.status(response.status);
      return res.json({message: "Error creating truck"});
    }
    const info = await response.json();
    res.status(201);
    return res.json(info);

  }

  async getAllTruck(req: Request, res: Response, next: NextFunction) {
    const url = 'http://localhost:3000/api/truck/all';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    if(response.status != 200){
      res.status(response.status);
      return res.json({message: "Error getting all trucks"});
    }
    const data = await response.json();
    res.status(200);
    return res.json(data);
  }

  async getTruck(req: Request, res: Response, next: NextFunction) {
    const url = 'http://localhost:3000/api/truck/id/'+req.body.truckId;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    if(response.status != 200){
      res.status(response.status);
      return res.json({message: "Error getting truck"});
    }

    const data = await response.json();
    res.status(200)
    return res.json(data);
  }

  async editTruck(req: Request, res: Response, next: NextFunction) {
    const url = 'http://localhost:3000/api/truck/';
    
    const data = req.body;
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if(response.status != 200){
      res.status(response.status);
      return res.json({message: "Error editing truck"});
    }
    const info = await response.json();
    res.status(200);
    return res.json(info);
  }

  async deleteTruck(req: Request, res: Response, next: NextFunction) {
    const url = 'http://localhost:3000/api/truck/id/'+req.params.id;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if(response.status != 200){
      res.status(response.status);
      return res.json({message: "Error deleting truck"});
    }
    const info = await response.json();
    res.status(200);
    return res.json(info);
    
  }

 



}