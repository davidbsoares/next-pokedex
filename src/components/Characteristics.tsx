import { Barbell, Ruler } from 'phosphor-react';
import { PokemonProps } from 'types';

interface characteristicsProps {
  pokemon: PokemonProps;
}

const Characteristics = ({ pokemon }: characteristicsProps) => {
  const { weight, height, moves } = pokemon;

  if (!pokemon) return null;
  return (
    <div className="flex items-end">
      <div className="flex flex-col gap-y-1 px-4">
        <div className="flex gap-x-1 items-center justify-center flex-wrap">
          <Barbell size={26} />
          <span className="text-sm">{weight && weight / 10} Kg</span>
        </div>
        <span className="text-sm text-center font-bold">Weight</span>
      </div>
      <div className="flex flex-col gap-y-1 px-4">
        <div className="flex gap-x-1 items-center justify-center flex-wrap">
          <Ruler size={26} />
          <span className="text-sm">{height && height / 10} m</span>
        </div>
        <span className="text-sm text-center font-bold">Height</span>
      </div>
      <div className="flex flex-col gap-y-1 px-4">
        <div className="flex flex-col text-center">
          {moves?.slice(0, 2).map(({ move }, index) => (
            <span className="text-sm" key={index}>
              {move}
            </span>
          ))}
        </div>
        <span className="text-sm text-center font-bold">Moves</span>
      </div>
    </div>
  );
};

export default Characteristics;
