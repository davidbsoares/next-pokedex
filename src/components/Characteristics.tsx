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
      <div className="flex flex-col px-4 gap-y-1">
        <div className="flex flex-wrap items-center justify-center gap-x-1">
          <Barbell size={26} />
          <span className="text-sm">{weight && weight / 10} Kg</span>
        </div>
        <span className="text-sm font-bold text-center">Weight</span>
      </div>
      <div className="flex flex-col px-4 gap-y-1">
        <div className="flex flex-wrap items-center justify-center gap-x-1">
          <Ruler size={26} />
          <span className="text-sm">{height && height / 10} m</span>
        </div>
        <span className="text-sm font-bold text-center">Height</span>
      </div>
      <div className="flex flex-col px-4 gap-y-1">
        <div className="flex flex-col text-center">
          {moves?.slice(0, 2).map(({ move }, index) => (
            <span className="text-sm" key={index}>
              {move}
            </span>
          ))}
        </div>
        <span className="text-sm font-bold text-center">Moves</span>
      </div>
    </div>
  );
};

export default Characteristics;
