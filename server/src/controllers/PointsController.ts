import { Request, Response, json } from 'express';

import knex from '../db/connection';

class PointsController {
  async list(req: Request, res: Response) {
    const { city, state, items } = req.query;

    const parsedItems = String(items)
      .split(',')
      .map((item) => Number(item.trim()));

    let baseQuery = knex('points').join('point_items', 'points.id', '=', 'point_items.point_id');

    if (city) {
      baseQuery = baseQuery.where('city', String(city));
    }

    if (state) {
      baseQuery = baseQuery.where('state', String(state));
    }

    if (items) {
      baseQuery = baseQuery.whereIn('point_items.item_id', parsedItems);
    }

    const points = await baseQuery.distinct().select('points.*');

    const serializedPoints = points.map((point) => {
      return {
        ...point,
        image: `http://localhost:3030/uploads/${point.image}`,
      };
    });

    return res.json(serializedPoints);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return res.status(400).json({ message: 'Point not found' });
    }

    const serializedPoint = {
      ...point,
      image: `http://localhost:3030/uploads/${point.image}`,
    };
    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

    return res.json({ point: serializedPoint, items });
  }

  async create(req: Request, res: Response) {
    const { name, email, whatsapp, latitude, longitude, city, state, items } = req.body;

    const trx = await knex.transaction();

    const point = {
      image: req.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      state,
    };
    const insertedIds = await trx('points').insert(point);

    const point_id = insertedIds[0];

    const pointItems = items
      .split(',')
      .map((item_id: string) => Number(item_id.trim()))
      .map((item_id: number) => {
        return {
          item_id,
          point_id,
        };
      });

    await trx('point_items').insert(pointItems);

    await trx.commit();

    return res.json({ id: point_id, ...point });
  }
}

export default PointsController;
