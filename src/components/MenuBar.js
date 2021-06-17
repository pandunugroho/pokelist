import React, { useState } from "react";
import { CgPokemon } from "react-icons/cg"
import { GiPokecog, GiUsbKey } from "react-icons/gi"
import styled from "@emotion/styled";
import { Link } from "react-router-dom";


export default function ManuBar({ children }) {
  const [selectedMenu, setSelectedMenu] = useState("list")

  const MenuItem = styled.div`
    background-color: #E74541;
    background-image:  ${props => props.type === selectedMenu ? "linear-gradient(45deg, #E74541 70%, rgba(254,254,254,0.5))" : ""};
    max-width: 134px;
    width: 33%;
    :not(:last-child) {
    border-right: 10px solid rgba(254,254,254,0.5);

    }
    p {
      margin: 0;
    }
  `

  return (
    <div style={{ overflowX: "hidden", maxWidth: 10000, margin: "auto" }}>
      {children}
      <div style={{ width: "100%", height: "13vh" }} />
      <div style={{ width: "100%", height: "10vh", position: "fixed", top: "90%", left: 0, backgroundColor: "#E74541", display: "flex" }}>
        <div style={{ width: 400, display: "flex", justifyContent: "space-evenly", color: "black", margin: "auto" }} >
          <MenuItem type="list">
            <Link to="/" style={{ textDecoration: "none", color: "#FEFEFE", width: "30%" }}>
              <div onClick={() => setSelectedMenu("list")} style={{ width: "100%" }}>
                <CgPokemon size={32} />
                <p>Pokélist</p>
              </div>
            </Link>
          </MenuItem>
          <MenuItem type="my-pokemon">
            <Link to="/my-pokemon" style={{ textDecoration: "none", color: "#FEFEFE", width: "30%" }}>
              <div onClick={() => setSelectedMenu("my-pokemon")} style={{ width: "100%" }}>
                <GiUsbKey size={32} />
                <p>My Pokémon</p>
              </div>
            </Link>
          </MenuItem>
          <MenuItem type="setting">
            <Link to="/setting" style={{ textDecoration: "none", color: "#FEFEFE", width: "30%" }}>
              <div onClick={() => setSelectedMenu("setting")} style={{ width: "100%" }}>
                <GiPokecog size={32} />
                <p>Setting</p>
              </div>
            </Link>
          </MenuItem>
        </div>
      </div>
    </div>
  )
}

