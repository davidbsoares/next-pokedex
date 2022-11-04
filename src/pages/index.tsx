import Card from '@components/Card';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import axios from 'axios';
import { SelectInput } from '@components/Select';
import * as Select from '@radix-ui/react-select';
import { PokemonProps } from 'types';
import { pokemonKinds, pokemonTypes } from 'constants/pokemonOptions';

interface resultsProps {
  name: string;
  url: string;
}

interface pokemonsListProps {
  pokemons: PokemonProps[];
  count: number;
}

const Home: NextPage<pokemonsListProps> = ({ pokemons, count }) => {
  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokedex mede with NextJs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center w-screen min-h-screen">
        <h1 className="mx-4 mt-16 text-4xl tracking-widest text-center">
          {count || '000'} Pokemons for you to choose your favorite
        </h1>
        <div className="flex gap-4 my-9">
          <SelectInput placeholder="Type">
            {pokemonTypes.map((value, index) => (
              <Select.Item
                key={index}
                value={value}
                className="py-2 hover:cursor-pointer hover:bg-slate-300 outline-0"
              >
                <Select.ItemText>{value}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </SelectInput>
          <SelectInput placeholder="Kind">
            {pokemonKinds.map((value, index) => (
              <Select.Item
                key={index}
                value={value}
                className="py-2 hover:cursor-pointer hover:bg-slate-300 outline-0"
              >
                <Select.ItemText>{value}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </SelectInput>
        </div>

        <div className="grid items-center justify-center w-full max-w-6xl grid-rows-3 justify-items-center mb-7 grid-cols-auto-fill gap-x-8 gap-y-11">
          {pokemons.map((pokemon) => (
            <Card pokemon={pokemon} key={pokemon.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context: GetServerSideProps) {
  try {
    const pokemonsList = await axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=9')
      .then(({ data }) => data);

    const { count, results } = pokemonsList;
    const pokemonsUrl = results.map((pokemon: resultsProps) =>
      axios.get(pokemon.url).then(({ data }) => data)
    );

    const pokemons = await Promise.all(pokemonsUrl)
      .then((values) => {
        return values;
      })
      .catch((err) => {
        console.log(err);
      });

    return { props: { pokemons, count } };
  } catch (error) {
    return { props: { error } };
  }
}

export default Home;
