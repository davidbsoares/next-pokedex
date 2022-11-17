export interface PokemonProps {
  id: number;
  name: string;
  weight?: number;
  height?: number;
  kinds?: string;
  types: string;
  hp?: number;
  atk: number;
  def: number;
  satk?: number;
  sdef?: number;
  spd?: number;
  moves?: string;
  image: string;
  description?: string;
}
