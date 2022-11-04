import "reflect-metadata";
import {Response, Request, NextFunction} from 'express';
import { Container } from 'typedi';
import config from '../../config';
import { Result }  from '../../src/core/logic/Result';
import * as sinon from 'sinon';
import TruckService from '../../src/services/TruckService';
import ITruckRepo from "../../src/repos/IRepos/ITruckRepo";
import { ITruckDTO } from '../../src/dto/ITruckDTO';
import { describe } from 'node:test';
import 'mocha';
import {expect} from "chai";
import exp from "node:constants";

describe('TruckService Unit Tests', () => {

    const sandbox = sinon.createSandbox();
    beforeEach(() => {
        Container.reset();

        
        let truckSchemaInstance = require('../../src/persistence/schemas/truckSchema').default;
        Container.set("truckSchema", truckSchemaInstance);

        let truckRepoClass = require('../../src/repos/truckRepo').default;
        let truckRepoInstance = Container.get(truckRepoClass);
        Container.set("TruckRepo", truckRepoInstance);

    });
    
    afterEach(() => {
        sinon.restore();
        sandbox.restore();
    });

    it('exists return true', async () => {
        
        let body = {
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1
        };

        let truckRepoInstance = Container.get("TruckRepo");

        sinon.stub(truckRepoInstance, "getTruckById").returns(Promise.resolve(body));
        const truckService = new TruckService(truckRepoInstance as ITruckRepo);
        const answer = await truckService.exist(body.truckID);
        expect(answer.getValue()).to.equal(true);

    });

});