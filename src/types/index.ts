export interface TypesProps {
  id: number;
  pokemonId: number;
  type: string;
  firstType: boolean;
}

interface MovesProps {
  id: number;
  pokemonId: number;
  move: string;
}

export interface PokemonProps {
  id: number;
  name: string;
  atk: number;
  def: number;
  image: string;
  types: TypesProps[];
  weight?: number;
  height?: number;
  hp?: number;
  satk?: number;
  sdef?: number;
  spd?: number;
  description?: string;
  special_kind?: string;
  moves?: MovesProps[];
}
