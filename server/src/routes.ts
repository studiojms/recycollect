import express from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.list);

routes.post('/points', pointsController.create);
routes.get('/points', pointsController.list);
routes.get('/points/:id', pointsController.show);

routes.get('/', (req, res) => {
  return res.json({ message: 'Welcome to recycollect' });
});

export default routes;
