// consume PokeAPI to get all pokemons and save in SQLite

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

import typeDatabase from 'data/typesDB.json';

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
    typeDatabase.map(async (type) => {
      return type.types.map(async (t) => {
        return await prisma.type.create({
          data: {
            pokemonId: type.id,
            type: t.name,
            firstType: t.firstType,
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
