import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
});

export const appRouter = router({
  // TODO: criar função para pegar pegar pokemons por página e parâmetros de tipo e nome
  // TODO: função pokemon por id

  getPokemons: publicProcedure
    .input(
      z.object({
        offset: z.number(),
        types: z.array(z.string()).optional(),
        kinds: z.array(z.string()).optional(),
      })
    )
    .query(async ({ input }) => {
      const pokemons = await prisma.$transaction([
        prisma.pokemon.count({
          where: {
            ...(input.types?.length
              ? {
                  types: {
                    in: input.types,
                  },
                }
              : {}),
            ...(input.kinds?.length
              ? {
                  kinds: {
                    in: input.kinds,
                  },
                }
              : {}),
          },
        }),
        prisma.pokemon.findMany({
          select: {
            id: true,
            name: true,
            atk: true,
            def: true,
            types: true,
            image: true,
          },
          take: 9,
          skip: input.offset,
          where: {
            ...(input.types?.length && {
              types: {
                in: input.types.join(','),
              },
            }),
            ...(input.kinds?.length && {
              kinds: {
                in: input.kinds.join(','),
              },
            }),
          },
        }),
      ]);

      return pokemons;
    }),
  getPokemon: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      return await prisma.pokemon.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
