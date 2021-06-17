import styled from "@emotion/styled";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return <div style={{ width: "100%", height: "80vh", display: "flex" }}>
    <LoadAnimate />
  </div>
}
const LoadAnimate = styled(AiOutlineLoading3Quarters)`
font-size: 48px;
margin: auto;
animation: rotating 2s infinite ease-in-out, rotating2 .3s infinite linear;

@keyframes rotating {
  0% { width:48px }
  50% { width:36px }
  100% { width:48px }
}
@keyframes rotating2 {
  0% {transform: rotate(0deg); }
  50% {transform: rotate(180deg); }
  100% {transform: rotate(360deg); }
}
`