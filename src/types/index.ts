export type PokemonsProps = {
  pokemons: Array<{
    name: string;
    id: number;
    weight?: number | null | undefined;
    height?: number | null | undefined;
    types: Array<{
      type?: {
        name: string;
      };
    }>;
    stats: Array<{
      base_stat: number;
      stat?: { name: string | null | undefined };
    }>;
    moves: Array<{
      move?: { name: string | null | undefined };
    }>;
    specy?: {
      is_legendary: boolean;
      is_mythical: boolean;
      is_baby: boolean;
      description: Array<{
        flavor_text: string;
      }>;
    };
  }>;
};

export interface PokemonProps {
  id: number;
  name: string;
  weight: number;
  height: number;
  types: {
    type?: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: { name?: string };
  }[];
  moves: {
    move?: { name?: string };
  }[];
  species?: {
    is_legendary: boolean;
    is_mythical: boolean;
    is_baby: boolean;
    flavor_text_entries: {
      flavor_text: string;
    }[];
  };
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}
