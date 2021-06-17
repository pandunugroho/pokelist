import { useHistory } from "react-router-dom"

export default function Setting({ children, data }) {
  const history = useHistory()
  return (
    <div style={{ width: "100%", height: "90vh", display: "flex" }}>
      <div style={{ margin: "auto", color: "red" }}>
        <div onClick={() => {
          window.localStorage.clear()
          history.push("/")
        }}>Release all Pokémon</div>
      </div>
    </div>
  )
}