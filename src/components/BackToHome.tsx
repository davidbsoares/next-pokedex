import Link from "next/link"
import { ArrowLeft } from "phosphor-react"

type Props = {
  pokemonName: string
}
const BackToHome = ({ pokemonName }: Props) => {
  return (
    <div className="flex items-center self-start w-full gap-2 pt-4 pl-4 text-4xl font-bold text-white capitalize">
      <Link href="/">
        <a>
          <ArrowLeft size={32} weight="bold" color="#ffffff" />
        </a>
      </Link>
      {pokemonName}
    </div>
  )
}
export default BackToHome