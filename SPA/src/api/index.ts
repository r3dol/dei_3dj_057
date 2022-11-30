import { Router } from 'express';
import pathRoute from './routes/pathRoute';
import roleRoute from './routes/roleRoute';
import user from './routes/userRoute';
import warehouseRoute from './routes/warehouseRoute';
import deliveryRoute from './routes/deliveryRoute';
import truckRoute from './routes/truckRoute';
import packageRoute from './routes/packageRoute';

export default () => {
	const app = Router();
	truckRoute(app)
	pathRoute(app);	
	user(app);
	warehouseRoute(app);
	deliveryRoute(app);
	roleRoute(app);
	packageRoute(app);
	
    return app;
}