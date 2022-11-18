import COLORS from 'constants/colors';
import Link from 'next/link';
import { PokemonProps } from 'types';
import Stats from './Stats';
import Tag from './Tag';

interface CardProps {
  pokemon: PokemonProps;
}

const Card = ({ pokemon }: CardProps) => {
  const { name, types, id, atk, def, image } = pokemon;

  const firstType = types.find((type) => type.firstType)?.type;

  return (
    <Link href={`/${id}`}>
      <a className="relative flex max-w-sm pt-1 pb-3 rounded-lg cursor-pointer bg-slate-50 pl-7 min-w-[336px]">
        <div className="z-10 flex flex-col">
          <span className="mb-5 text-lg font-bold capitalize text-dark text-shadow">
            {name}
          </span>
          <div className="flex items-center content-start gap-2 mb-3">
            <Stats name="ATK" value={atk} />
            <Stats name="DEF" value={def} />
          </div>
          <div className="flex items-center content-start gap-2">
            {types
              .sort((x) => (x.firstType ? -1 : 1))
              .slice(0, 2)
              .map(({ type }, i) => (
                <Tag key={i} type={type} />
              ))}
          </div>
        </div>

        <div
          className="absolute top-0 right-0 flex justify-end w-3/5 h-full rounded-r-lg"
          style={{
            background: `linear-gradient(to left,${
              firstType && COLORS.types[firstType]
            } 75%, transparent 100%)`,
          }}
        >
          <img className="w-auto h-full" src={image} alt={name} />
        </div>
      </a>
    </Link>
  );
};

export default Card;
