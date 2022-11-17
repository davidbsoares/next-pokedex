// consume PokeAPI to get all pokemons and save in SQLite

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

import pokemonDatabase from 'data/pokemonDatabase.json';

const prisma = new PrismaClient({
  log: ['query'],
});

type Data = {
  name: string;
};

export const config = {
  api: {
    responseLimit: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  /* return Promise.allSettled(
    pokemonDatabase.map(async (pokemon) => {
      return await prisma.pokemon.create({
        data: pokemon,
      });
    })
  )
    .then(() => {
      return res.status(201);
    })
    .catch((err) => console.error(err)); */
}
