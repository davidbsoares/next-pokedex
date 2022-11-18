// consume PokeAPI to get all pokemons and save in SQLite

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

import moveDatabase from 'data/movesDB.json';

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
  /*  return Promise.allSettled(
    moveDatabase.map(async (move) => {
      return move.moves.map(async (m) => {
        return await prisma.move.create({
          data: {
            pokemonId: move.id,
            move: m,
          },
        });
      });
    })
  )
    .then(() => {
      return res.status(201);
    })
    .catch((err) => console.error(err)); */
}
