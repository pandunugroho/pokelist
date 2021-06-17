import { useState } from "react"
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Alert from "@material-ui/lab/Alert";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from "../components/Button"
import CardList from "../components/CardList"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
export default function MyPokemon() {
  const classes = useStyles()
  const history = useHistory()
  const [releaseIndex, setReleaseIndex] = useState(-1)
  let dataInStorage = JSON.parse(window.localStorage.getItem("data"))

  const handleRelease = () => {
    dataInStorage.splice(releaseIndex, 1)
    window.localStorage.setItem("data", JSON.stringify(dataInStorage))
    setReleaseIndex(-1)
    history.push("/my-pokemon")
  }
  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-evenly",
        backgroundColor: "#E74541",
        padding: "10px 0",
        position: "fixed",
        width: "100%",
        zIndex: 2
      }}>
        <strong style={{ color: "white" }}>Total Captured: {dataInStorage ? dataInStorage.length : 0} Pokémon</strong>
      </div>
      <div style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        paddingTop: 50
      }}>
        {dataInStorage && dataInStorage.length
          ? dataInStorage.map((pokemon, i) => {
            return <CardList pokemon={{ ...pokemon, image: pokemon.sprites.front_default }} i={i} setReleaseIndex={setReleaseIndex} />
          })
          : <div>No Captured Pokémon</div>}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={releaseIndex !== -1}
        onClose={() => setReleaseIndex(-1)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={releaseIndex !== -1}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Releasing Pokemon...</h2>
            <p id="transition-modal-description">Are you sure?</p>
            <Button
              onClick={() => {
                handleRelease()
              }}
              style={{ bottom: 0, left: 85 }}
            >Confirm</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}