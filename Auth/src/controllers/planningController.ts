import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';
import fetch from 'node-fetch';
import IPlanningController from './IControllers/IPlanningControler';
import config from '../../config';
const http = require('https');
const jwt = require('jsonwebtoken');

@Service()
export default class PlanningController implements IPlanningController {
  constructor() {}

  private roles = ["admin", "logMan"];

  isAuthenticated(req: Request) {
    if(req.cookies['jwt'] == undefined)
      return false;
    const cookie = req.cookies['jwt'];
    const claims = jwt.verify(cookie, config.jwtSecret);
    if(!claims)
        return false;
    
    return true;
  }

  isAuthorized(req: Request) {
    if(req.cookies['jwt'] == undefined)
      return false;
    const cookie = req.cookies['jwt'];
    const claims = jwt.verify(cookie, config.jwtSecret);
    if(!claims)
        return false;
    if(this.roles.indexOf(claims.role) > -1)
      return true;
    return false;
  }

 

  private async fetch(url : string, method: string, body: any, cookie:any, agent: any = null){
   
    if(body)
      return await fetch(url,{
        method : method,
        body : JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'Cookie': cookie
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


  async findAllBestPath(req: Request, res: Response, next: NextFunction) {
    if(req.headers.authorization!=undefined)
      req.cookies["jwt"]=req.headers.authorization.split("=")[1];
    if(!this.isAuthenticated(req)){
      res.status(401);
      return res.json({message: "Not authenticated"});
    }
    if(!this.isAuthorized(req)){
      res.status(403);
      return res.json({message: "Not authorized"});
    }
    req.headers.cookie = "jwt="+req.cookies["jwt"];
    const url_prolog = 'https://vs-gate.dei.isep.ipp.pt:30382/bestPath_findAll';
    const httpAgent = new http.Agent({rejectUnauthorized: false});

    const data = req.body;
    console.log(data)
    const response = await this.fetch(url_prolog, 'POST', data, httpAgent); 

    const info = await response.json();
    res.status(200);
    return res.json(info);
  }

  async heuristicMass(req: Request, res: Response, next: NextFunction) {
    if(req.headers.authorization!=undefined)
      req.cookies["jwt"]=req.headers.authorization.split("=")[1];
    if(!this.isAuthenticated(req)){
      res.status(401);
      return res.json({message: "Not authenticated"});
    }
    if(!this.isAuthorized(req)){
      res.status(403);
      return res.json({message: "Not authorized"});
    }
    req.headers.cookie = "jwt="+req.cookies["jwt"];
    const url_prolog = 'https://vs-gate.dei.isep.ipp.pt:30382/heuristic_mass';
    const httpAgent = new http.Agent({rejectUnauthorized: false});

    const data = req.body;
    const response = await this.fetch(url_prolog, 'POST', data, req.headers.cookie ,httpAgent); 

    const info = await response.json();
    res.status(200);
    return res.json(info);
  }

  async heuristicClosestWarehouse(req: Request, res: Response, next: NextFunction) {
    if(req.headers.authorization!=undefined)
      req.cookies["jwt"]=req.headers.authorization.split("=")[1];
    if(!this.isAuthenticated(req)){
      res.status(401);
      return res.json({message: "Not authenticated"});
    }
    if(!this.isAuthorized(req)){
      res.status(403);
      return res.json({message: "Not authorized"});
    }
    req.headers.cookie = "jwt="+req.cookies["jwt"];
    const url_prolog = 'https://vs-gate.dei.isep.ipp.pt:30382/heuristic_closestWarehouse';
    const httpAgent = new http.Agent({rejectUnauthorized: false});

    const data = req.body;
    const response = await this.fetch(url_prolog, 'POST', data, req.headers.cookie, httpAgent); 

    const info = await response.json();
    res.status(200);
    return res.json(info);
  }

  async heuristicMassAndDistance(req: Request, res: Response, next: NextFunction) {
    if(req.headers.authorization!=undefined)
      req.cookies["jwt"]=req.headers.authorization.split("=")[1];
    if(!this.isAuthenticated(req)){
      res.status(401);
      return res.json({message: "Not authenticated"});
    }
    if(!this.isAuthorized(req)){
      res.status(403);
      return res.json({message: "Not authorized"});
    }
    req.headers.cookie = "jwt="+req.cookies["jwt"];
    const url_prolog = 'https://vs-gate.dei.isep.ipp.pt:30382/heuristic_massAndDistance';
    const httpAgent = new http.Agent({rejectUnauthorized: false});

    const data = req.body;
    const response = await this.fetch(url_prolog, 'POST', data, req.headers.cookie, httpAgent); 

    const info = await response.json();
    res.status(200);
    return res.json(info);
  }

}



