import express from 'express';
import multer from 'multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

import multerConfig from './cofig/multer';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.list);

routes.get('/points', pointsController.list);
routes.get('/points/:id', pointsController.show);
routes.post('/points', upload.single('image'), pointsController.create);

routes.get('/', (req, res) => {
  return res.json({ message: 'Welcome to recycollect' });
});

export default routes;
