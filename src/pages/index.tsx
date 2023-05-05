import type { NextPage } from 'next';
import Head from 'next/head';
import Card from '@components/Card';
import { pokemonKinds, pokemonTypes } from 'constants/pokemonOptions';
import Pagination from '@components/Pagination';
import { useState, useEffect } from 'react';
import { trpc } from 'utils/trpc';
import Select from '@components/Select';
import Loading from '@components/Loading';

interface selectProps {
  value: string;
  label: string;
}

const Home: NextPage = () => {
  const [kind, setKind] = useState<selectProps[]>([]);
  const [type, setType] = useState<selectProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const { data, isLoading } = trpc.getPokemons.useQuery({
    offset: (currentPage - 1) * pageSize,
    types: type.map((t) => t.value),
    kinds: kind.map((t) => t.value),
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [kind, type]);

  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokedex made with NextJs" />
        <meta name="og:title" content="Pokedex" />
        <meta property="og:description" content="Pokedex made with NextJs" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://4.bp.blogspot.com/-NClwQIrF9dw/UKZtlzh3BUI/AAAAAAAADIU/UJJlJhrQRHo/s1600/Pokedex_DP.png"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center w-full min-h-screen">
        <h1 className="mx-4 mt-16 text-4xl tracking-widest text-center">
          {data?.total || '000'} Pokemons for you to choose your favorite
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

        {!isLoading ? (
          <div className="grid items-center justify-center w-full max-w-6xl grid-rows-3 justify-items-center mb-7 grid-cols-auto-fill gap-x-8 gap-y-11">
            {data?.pokemons?.map((pokemon) => (
              <Card pokemon={pokemon} key={pokemon.id} />
            ))}
          </div>
        ) : (
          <Loading />
        )}

        {data && (
          <Pagination
            currentPage={currentPage}
            totalCount={data?.total}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </>
  );
};

export default Home;
