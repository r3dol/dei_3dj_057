import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';
import ITruckController from "./IControllers/ITruckController";
import fetch from 'node-fetch';
const http = require('https');
@Service()
export default class TruckController implements ITruckController {
  constructor() {}

  private async fetch(url : string, method: string, body: any, agent: any = null){
   
    if(body)
      return await fetch(url,{
        method : method,
        body : JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
        agent: agent
      });
    else
      return await fetch(url,{
        method : method,
        headers: {
          'Content-Type': 'application/json'
        },
        agent: agent
      });
  }

  async createTruck(req: Request, res: Response, next: NextFunction) {
    const url = 'http://localhost:3000/api/truck/';
    const data = req.body;

    const response = await this.fetch(url, 'POST', data); 
    
    if(response.status != 201){
      res.status(response.status);
      return res.json({message: "Error creating truck"});
    }
    const httpAgent = new http.Agent({rejectUnauthorized: false});
    const url_prolog = 'https://vs-gate.dei.isep.ipp.pt:30382/create_truck';
    const response_prolog = await this.fetch(url_prolog, 'POST', data, httpAgent); 
    const info = await response.json();
    res.status(201);
    return res.json(info);

  }

  async createTruckProlog(req: Request, res: Response, next: NextFunction) {

    const url_prolog = 'https://vs-gate.dei.isep.ipp.pt:30382/create_truck';
    const httpAgent = new http.Agent({rejectUnauthorized: false});
    const response_prolog = await this.fetch(url_prolog, 'POST', req.body, httpAgent);

    if(response_prolog.status != 201){
      res.status(response_prolog.status);
      return res.json({message: "Error creating truck"});
    }
    const info = await response_prolog.json();
    res.status(201);
    return res.json(info);

  }

  async getAllTruck(req: Request, res: Response, next: NextFunction) {
    const url = 'http://localhost:3000/api/truck/all';
    const response = await this.fetch(url, 'GET', null);

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
    const response = await this.fetch(url, 'GET', null);
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
    const response = await this.fetch(url, 'PATCH', data);
    if(response.status != 200){
      res.status(response.status);
      return res.json({message: "Error editing truck"});
    }

    const url_prolog = 'https://vs-gate.dei.isep.ipp.pt:30382/update_truck';
    const httpAgent = new http.Agent({rejectUnauthorized: false});
    const response_prolog = await this.fetch(url_prolog, 'PUT', data, httpAgent);
    const info = await response.json();
    res.status(200);
    return res.json(info);
  }

  async editTruckProlog(req: Request, res: Response, next: NextFunction) {

    const url_prolog = 'https://vs-gate.dei.isep.ipp.pt:30382/update_truck';
    const httpAgent = new http.Agent({rejectUnauthorized: false});
    const response_prolog = await this.fetch(url_prolog, 'PUT', req.body, httpAgent);

    if(response_prolog.status != 200){
      res.status(response_prolog.status);
      return res.json({message: "Error editing truck"});
    }
    const info = await response_prolog.json();
    res.status(200);
    return res.json(info);
  }

  async deleteTruck(req: Request, res: Response, next: NextFunction) {
    const url = 'http://localhost:3000/api/truck/id/'+req.params.id;

    const response = await this.fetch(url, 'DELETE', null);

    if(response.status != 200){
      res.status(response.status);
      return res.json({message: "Error deleting truck"});
    }
 
    const httpAgent = new http.Agent({rejectUnauthorized: false});
    const url_prolog = 'https://vs-gate.dei.isep.ipp.pt:30382/delete_truck';
    const response_prolog = await this.fetch(url_prolog, 'DELETE', null, httpAgent);
    const info = await response.json();
    res.status(200);
    return res.json(info);
    
  }

  async deleteTruckProlog(req: Request, res: Response, next: NextFunction) {
  
    const httpAgent = new http.Agent({ rejectUnauthorized: false });
    const url_prolog = 'https://vs-gate.dei.isep.ipp.pt:30382/delete_truck';

    const response_prolog = await this.fetch(url_prolog, 'DELETE', null, httpAgent);

    if(response_prolog.status != 200){
      res.status(response_prolog.status);
      return res.json({message: "Error deleting truck"});
    }

    const info = await response_prolog.json();
    res.status(200);
    return res.json(info);
    
  }

 



}