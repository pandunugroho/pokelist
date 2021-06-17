import { capsFirstChar } from "../helper/string";
import Button from "../components/Button"
import { useHistory } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi"
import { CgTrashEmpty } from "react-icons/cg"

export default function Card({ children, pokemon, i, setReleaseIndex }) {
  const history = useHistory()
  return (
    <div style={{ margin: 10, width: 150 }}>
      <div
        style={{ minWidth: 108 }}>
        <div style={{ width: "100%", height: 96 }}
          onClick={() => {
            history.push(`/detail/${pokemon.name}`)
          }}
        >
          <img src={pokemon.image} alt={pokemon.name + ".png"} width="96px" />
        </div>
        <div
          style={{
            width: "100%",
            minHeight: 64.8,
            borderBottomLeftRadius: 5,
            borderBottom: "3px solid grey",
            alignItems: "center",
            justifyContent: "center",
            display: "flex"
          }}
          onClick={() => {
            history.push(`/detail/${pokemon.name}`)
          }}
        >{pokemon.nickName ? capsFirstChar(pokemon.nickName) + ` (${capsFirstChar(pokemon.name)})` : capsFirstChar(pokemon.name)}</div>
        {pokemon.nickName
          ? <Button onClick={() => {
            setReleaseIndex(i)
            console.log(i);
          }}><CgTrashEmpty size={18} /></Button>
          : <Button onClick={() => {
            history.push(`/detail/${pokemon.name}`)
          }}><HiOutlineSearch /></Button>
        }
      </div>
    </div>
  )
}
// <Redirect to={`/detail/${pokemon.name}`} />