import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { POKEMON_DETAIL } from "../queries/pokemon";
import Loading from "../components/Loading"

import { makeStyles } from '@material-ui/core/styles';
import Alert from "@material-ui/lab/Alert";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useEffect } from "react/cjs/react.production.min";
import { capsFirstChar } from "../helper/string";
import Button from "../components/Button";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function PokemonDetail({ children }) {
  const params = useParams()
  const classes = useStyles();
  const [name, setName] = useState(params.name)
  const [nickName, setNickName] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [alert, setAlert] = useState(false)
  let dataInStorage = window.localStorage.getItem("data")

  let capturedPokemon = dataInStorage ? JSON.parse(dataInStorage) : []
  const { error, loading, data } = useQuery(POKEMON_DETAIL, {
    variables: {
      name: name
    }
  })

  const handleCapture = (e) => {
    if ((Date.now() + Math.round(Math.random())) % 2 === 1) {
      setIsModalVisible(true)
    } else {
      setAlert(true)
      setAlertOff()
    }
  }

  const handleAddPokemon = () => {

    let isNameInvalid
    if (dataInStorage && dataInStorage !== "[]") {
      JSON.parse(dataInStorage).map(datum => {
        if (datum.nickName === nickName) isNameInvalid = true
        else isNameInvalid = false
      })
    } else isNameInvalid = false

    if (!isNameInvalid) {
      capturedPokemon.push({ ...data.pokemon, nickName })
      window.localStorage.setItem("data", JSON.stringify(capturedPokemon))
      setIsModalVisible(false)
    } else {
      setAlert(true)
      setAlertOff()
    }
  }

  const setAlertOff = () => {

    setTimeout(() => {
      setAlert(false)
    }, 3000);
  }
  return loading
    ? <Loading />
    : error
      ? <p>Error</p>
      : <div>
        <div style={{ display: "flex", justifyContent: "space-evenly", backgroundColor: "#E74541", padding: "10px 0", position: "fixed", width: "100%", zIndex: 2 }}>
          <strong style={{ color: "white" }}>{capsFirstChar(data.pokemon.name)}</strong>
        </div>
        <div style={{ height: 60 }} />
        <img src={data.pokemon.sprites.front_default} alt="detail-poke-img" width={200} />
        <div><h5>Element(s)</h5> &nbsp;{data.pokemon.types.map(type => " ♦ " + capsFirstChar(type.type.name))}</div>
        <h5>Possible Moves</h5>
        <MovesWrapper>
          {data.pokemon.moves.map(move => <div style={{ width: 150, textAlign: "left" }}> ♦ {capsFirstChar(move.move.name)}<br /></div>)}
        </MovesWrapper>

        <Alert severity="error" style={{ display: alert ? "flex" : "none", }}>Pokemon flee</Alert>
        <button
          onClick={handleCapture}
          style={{
            display: alert ? "none" : "inline-block",
            marginTop: 10,
            border: "none",
            backgroundColor: "rgb(231, 69, 65)",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px 15px"
          }}><strong>Capture !</strong></button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={isModalVisible}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Pokemon Captured!</h2>
              <p id="transition-modal-description">Now, give it a name..</p>
              <input autoFocus onChange={(e) => setNickName(e.target.value.toLowerCase().trim())} />
              <Button
                onClick={() => {
                  handleAddPokemon()
                }}
                style={{ bottom: 0, left: 10 }}
              >Confirm</Button>
            </div>
          </Fade>
        </Modal>
      </div>

}

const MovesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  height: 30vh;
  overflow-y: auto;
`