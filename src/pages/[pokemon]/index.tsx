import Head from 'next/head';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { GetStaticPropsContext, NextPage } from 'next';

import Subtitle from '@components/Subtitle';
import Characteristics from '@components/Characteristics';
import { appRouter } from 'server/routers/_app';
import COLORS from 'constants/colors';
import { PokemonProps } from 'types';
import BaseStats from '@components/BaseStats';
import { PrismaClient } from '@prisma/client';
import PokemonImage from '@components/PokemonImage';
import PokemonTags from '@components/PokemonTags';
import BackToHome from '@components/BackToHome';

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
        <BackToHome pokemonName={pokemon.name} />
        <div
          className="flex flex-col w-4/5 align-center sm:w-3/5 md:w-2/5 lg:w-1/3"
          style={{ backgroundColor: firstType && COLORS.types[firstType] }}
        >
          <div className="flex flex-col justify-center items-center w-full bg-[white] px-5 pb-11 rounded-lg relative mt-36">
            <PokemonImage pokemon={pokemon} />
            <PokemonTags types={pokemon.types} />
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
    fallback: 'blocking',
  };
}

export default Pokemon;
