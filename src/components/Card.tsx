import clsx from 'clsx';
import COLORS from 'constants/colors';
import { PokemonProps } from 'types';
import Stats from './Stats';
import Tag from './Tag';

interface CardProps {
  pokemon: PokemonProps;
  handleOpenModal?: (id: number) => void;
}

const Card = ({ pokemon, handleOpenModal }: CardProps) => {
  const { name, stats, types, id } = pokemon;

  const firstType = types?.[0]?.type?.name;

  function getAttackDefense(value: any) {
    if (value.stat?.name === 'attack' || value.stat?.name === 'defense') {
      return value;
    }
  }
  return (
    <div className="relative flex max-w-sm pt-1 pb-3 rounded-lg cursor-pointer bg-slate-50 pl-7 min-w-[336px]">
      <div className="z-10 flex flex-col">
        <span className="mb-5 text-lg font-bold capitalize text-dark text-shadow">
          {name}
        </span>
        <div className="flex items-center content-start gap-2 mb-3">
          {stats.filter(getAttackDefense).map((s: any, i: number) => (
            <Stats key={i} name={s.stat.name} value={s.base_stat} />
          ))}
        </div>
        <div className="flex items-center content-start gap-2">
          {types.slice(0, 2).map((t: any, i: number) => (
            <Tag key={i} type={t.type.name} />
          ))}
        </div>
      </div>
      {/* todo:colored bg image */}
      <div
        className="absolute top-0 right-0 flex justify-end w-3/5 h-full rounded-r-lg"
        style={{
          background: `linear-gradient(to left,${
            firstType && COLORS.types[firstType]
          } 75%, transparent 100%)`,
        }}
      >
        <img
          className="w-auto h-full"
          src={pokemon.sprites.other['official-artwork'].front_default}
        />
      </div>
    </div>
  );
};

export default Card;
