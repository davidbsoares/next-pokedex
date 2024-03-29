import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
});

export const appRouter = router({
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
                    some: {
                      type: {
                        in: input.types,
                      },
                    },
                  },
                }
              : {}),
            ...(input.kinds?.length
              ? {
                  specialKind: {
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
            moves: true,
          },
          take: 9,
          skip: input.offset,
          where: {
            ...(input.types?.length
              ? {
                  types: {
                    some: {
                      type: {
                        in: input.types,
                      },
                    },
                  },
                }
              : {}),
            ...(input.kinds?.length
              ? {
                  specialKind: {
                    in: input.kinds,
                  },
                }
              : {}),
          },
        }),
      ]);
      return { total: pokemons[0], pokemons: pokemons[1] };
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
        select: {
          id: true,
          name: true,
          atk: true,
          def: true,
          types: true,
          image: true,
          moves: true,
          height: true,
          description: true,
          hp: true,
          satk: true,
          sdef: true,
          spd: true,
          weight: true,
        },
      });
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
