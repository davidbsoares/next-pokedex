import { PokemonProps } from "types"
import Tag from "./Tag"

type Props = {
  types: PokemonProps['types']
}
const PokemonTags = ({ types }: Props) => {
  return (
    <div className="flex justify-center gap-4 mt-12 align-center">
      {types
        ?.sort((x) => (x.firstType ? -1 : 1))
        .slice(0, 2)
        .map(({ type }, i) => (
          <Tag key={i} type={type} />
        ))}
    </div>
  )
}
export default PokemonTags