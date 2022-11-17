import type { NextPage } from 'next';
import Head from 'next/head';
import Card from '@components/Card';
import { PokemonProps } from 'types';
import { pokemonKinds, pokemonTypes } from 'constants/pokemonOptions';
import Pagination from '@components/Pagination';
import { useState, useEffect } from 'react';
import { trpc } from 'utils/trpc';
import Select from '@components/Select';

interface pokemonsListProps {
  pokemons: PokemonProps[];
  count: number;
}

interface selectProps {
  value: string;
  label: string;
}

const Home: NextPage<pokemonsListProps> = () => {
  const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
  const [kind, setKind] = useState<selectProps[]>([]);
  const [type, setType] = useState<selectProps[]>([]);
  const [total, setTotal] = useState(0);
  const pageSize = 9;

  const [currentPage, setCurrentPage] = useState(1);
  const data = trpc.getPokemons.useQuery({
    offset: (currentPage - 1) * pageSize,
    types: type.map((t) => t.value),
    kinds: kind.map((t) => t.value),
  }).data;

  console.log(data);

  useEffect(() => {
    if (data && total !== data?.[0]) {
      setTotal(data?.[0]);
    }
    if (data?.[1]) {
      setPokemons(data?.[1]);
    }
  }, [data, total]);

  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokedex mede with NextJs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center w-full min-h-screen">
        <h1 className="mx-4 mt-16 text-4xl tracking-widest text-center">
          {total || '000'} Pokemons for you to choose your favorite
        </h1>
        <div className="flex gap-4 my-9">
          <Select
            value={type}
            setValue={setType}
            options={pokemonTypes}
            placeholder="Type"
          />
          <Select
            value={kind}
            setValue={setKind}
            options={pokemonKinds}
            placeholder="Kind"
          />
        </div>

        <div className="grid items-center justify-center w-full max-w-6xl grid-rows-3 justify-items-center mb-7 grid-cols-auto-fill gap-x-8 gap-y-11">
          {pokemons.map((pokemon) => (
            <Card pokemon={pokemon} key={pokemon.id} />
          ))}
        </div>

        {total && (
          <Pagination
            currentPage={currentPage}
            totalCount={total}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </>
  );
};

export default Home;
