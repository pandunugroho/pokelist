import styled from "@emotion/styled"
// import MuiButton from "@material-ui/core/Button"

export default function Button({ children, style, onClick, disabled }) {
  return (
    <ButtonStyled onClick={onClick} style={style} disabled={disabled}>
      {children}
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button`
  border: none;
  padding: 5px 10px;
  border-radius: 5px 10px;
  position: relative;
  bottom: 13px;
  left: 50px;
  background-color: rgba(255,255,255);
`