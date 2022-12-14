import Head from 'next/head';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { GetStaticPropsContext, NextPage } from 'next';

import Subtitle from '@components/Subtitle';
import Characteristics from '@components/Characteristics';
import Tag from '@components/Tag';
import { appRouter } from 'server/routers/_app';
import COLORS from 'constants/colors';
import { PokemonProps } from 'types';
import BaseStats from '@components/BaseStats';
import { ArrowLeft, CaretLeft, CaretRight } from 'phosphor-react';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';

interface pageProps {
  pokemon: PokemonProps;
}

const prisma = new PrismaClient({
  log: ['query'],
});

const Pokemon: NextPage<pageProps> = ({ pokemon }) => {
  if (!pokemon) {
    return null;
  }

  const firstType = pokemon?.types?.find((type) => type.firstType)?.type;

  return (
    <>
      <Head>
        <title>Pokedex | {pokemon.name}</title>
        <meta name="og:title" content={pokemon.name} />
        <meta name="description" content={pokemon.description} />
        <meta property="og:image" content={pokemon.image} />
        <meta name="twitter:card" content="summary" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="flex flex-col items-center w-full min-h-screen pb-5 gap-y-8"
        style={{ backgroundColor: firstType && COLORS.types[firstType] }}
      >
        <div className="flex items-center self-start w-full gap-2 pt-4 pl-4 text-4xl font-bold text-white capitalize">
          <Link href="/">
            <a>
              <ArrowLeft size={32} weight="bold" color="#ffffff" />
            </a>
          </Link>
          {pokemon.name}
        </div>
        <div
          className="flex flex-col w-4/5 align-center sm:w-3/5 md:w-2/5 lg:w-1/3"
          style={{ backgroundColor: firstType && COLORS.types[firstType] }}
        >
          <div className="flex flex-col justify-center items-center w-full bg-[white] px-5 pb-11 rounded-lg relative mt-36">
            <img
              className="absolute top-0 w-48 -translate-x-1/2 aspect-square left-1/2 -translate-y-3/4"
              src={pokemon.image}
              alt={pokemon.name}
            />
            {pokemon.id > 1 && (
              <Link href={`/${pokemon.id - 1}`}>
                <a>
                  <CaretLeft
                    color="#ffffff"
                    className="absolute top-0 left-0 -translate-y-12"
                    size={32}
                  />
                </a>
              </Link>
            )}
            <Link href={`/${pokemon.id + 1}`}>
              <a>
                <CaretRight
                  color="#ffffff"
                  className="absolute top-0 right-0 -translate-y-12"
                  size={32}
                />
              </a>
            </Link>

            <div className="flex justify-center gap-4 mt-12 align-center">
              {pokemon?.types
                ?.sort((x) => (x.firstType ? -1 : 1))
                .slice(0, 2)
                .map(({ type }, i) => (
                  <Tag key={i} type={type} />
                ))}
            </div>
            <Subtitle title="About" color={firstType} />
            <Characteristics pokemon={pokemon} />
            <Subtitle title="Base Stats" color={firstType} />
            <BaseStats pokemon={pokemon} />
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ pokemon: string }>
) {
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: {},
  });

  const id = Number(context.params?.pokemon);
  // prefetch `post.byId`

  const pokemon = await ssg.getPokemon.fetch({ id });
  return {
    props: {
      pokemon,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const pokemons = await prisma.pokemon.findMany({
    select: {
      id: true,
    },
  });

  return {
    paths: pokemons.map((pokemon) => ({
      params: {
        pokemon: pokemon.id.toString(),
      },
    })),
    // https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking
    fallback: 'blocking',
  };
}

export default Pokemon;
