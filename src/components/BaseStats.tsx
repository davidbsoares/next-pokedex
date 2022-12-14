import { PokemonProps } from 'types';
import BarPoints from './BarPoints';
import COLORS from 'constants/colors';

interface characteristicsProps {
  pokemon: PokemonProps;
}

const BaseStats = ({ pokemon }: characteristicsProps) => {
  if (!pokemon) return null;
  const { types, atk, def, hp, satk, sdef, spd } = pokemon;
  const firstType = types?.find((type) => type.firstType)?.type;

  const stats = [
    { name: 'HP', value: hp || 0 },
    { name: 'ATK', value: atk || 0 },
    { name: 'DEF', value: def || 0 },
    { name: 'SATK', value: satk || 0 },
    { name: 'SDEF', value: sdef || 0 },
    { name: 'SPD', value: spd || 0 },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      {stats.map((stat, index) => {
        return (
          <div key={index} className="flex items-center justify-center">
            <span
              className="pr-3 border-r border-solid border-r-gray-400 flex justify-end w-[50px]"
              style={{ color: firstType && COLORS.types[firstType] }}
            >
              {stat.name}
            </span>
            <span className="w-12 pl-3 pr-2">{stat.value}</span>
            <BarPoints color={firstType} value={stat.value} />
          </div>
        );
      })}
    </div>
  );
};

export default BaseStats;
