import { Request, Response } from 'express';

import knex from '../db/connection';

class ItemsController {
  async list(req: Request, res: Response) {
    const items = await knex('items').select('*');

    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://localhost:3030/uploads/${item.image}`,
      };
    });

    return res.json(serializedItems);
  }
}

export default ItemsController;
