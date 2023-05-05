import Link from "next/link"
import { CaretLeft, CaretRight } from "phosphor-react"
import { PokemonProps } from "types"

type Props = {
  pokemon: PokemonProps
}
const PokemonImage = ({ pokemon }: Props) => {
  return (
    <>
      <img
        className="absolute top-0 w-48 -translate-x-1/2 aspect-square left-1/2 -translate-y-3/4"
        src={pokemon.image}
        alt={pokemon.name}
      />
      {pokemon.id > 1 && (
        <Link href={`/${pokemon.id - 1}`}>
          <a>
            <CaretLeft
              color="#ffffff"
              className="absolute top-0 left-0 -translate-y-12"
              size={32}
            />
          </a>
        </Link>
      )}
      <Link href={`/${pokemon.id + 1}`}>
        <a>
          <CaretRight
            color="#ffffff"
            className="absolute top-0 right-0 -translate-y-12"
            size={32}
          />
        </a>
      </Link>
    </>
  )
}
export default PokemonImage