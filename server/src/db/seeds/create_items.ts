import Knex from 'knex';

async function seed(knex: Knex) {
  await knex('items').insert([
    {
      title: 'Lamps',
      image: 'lamps.svg',
    },
    {
      title: 'Batteries',
      image: 'battery.svg',
    },
    {
      title: 'Paper',
      image: 'paper.svg',
    },
    {
      title: 'Electronic Waste',
      image: 'electronics.svg',
    },
    {
      title: 'Organic Waste',
      image: 'organics.svg',
    },
    {
      title: 'Oil',
      image: 'oil.svg',
    },
  ]);
}

export { seed };
