
import { useQuery } from "@apollo/client"
import { useState } from "react";
import { POKEMON_LIST } from "../queries/pokemon";
import CardList from "../components/CardList"
import Button from "../components/Button";
import Loading from "../components/Loading";

export default function PokemonList() {
  const [limit, setLimit] = useState(12)
  const [offset, setOffset] = useState(0)
  if (offset < 0) setOffset(0)
  const { error, loading, data } = useQuery(POKEMON_LIST, {
    variables: {
      limit: limit,
      offset: offset
    }
  })
  let pokemons = data ? data.pokemons.results : []
  const dataInStorage = JSON.parse(window.localStorage.getItem("data"))
  return <div >
    <div style={{ display: "flex", justifyContent: "space-evenly", backgroundColor: "#E74541", padding: "10px 0", position: "fixed", width: "100%", zIndex: 2 }}>
      <Button style={{ bottom: 0, left: 0 }} onClick={() => setOffset(offset - limit)} disabled={offset === 0}>{"<"}</Button>
      <strong style={{ color: "white" }}>Total Captured: {dataInStorage ? dataInStorage.length : 0} Pokémon</strong>
      <Button style={{ bottom: 0, left: 0 }} onClick={() => setOffset(offset + limit)} >{">"}</Button>
    </div>
    <div style={{ display: "flex", width: "100%", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", paddingTop: 50 }}>
      {loading
        ? <Loading />
        : error
          ? <h3>Error, please try again</h3>
          : pokemons.map((pokemon) => {
            return <CardList pokemon={pokemon} />
          })
      }
    </div>
  </div>
}