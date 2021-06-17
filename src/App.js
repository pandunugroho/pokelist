import './App.css';
import styled from "@emotion/styled"
import { Route, HashRouter, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import theme from './theme/theme';
import PokemonList from './pages/PokemonList';
import MyPokemon from './pages/MyPokemon';
import PokemonDetail from './pages/PokemonDetail';
import Setting from './pages/Setting';
import MenuBar from "./components/MenuBar";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <ThemeProvider theme={theme}>
          <Alpha>
            <MenuBar>
              <Switch>
                <Route exact path="/">
                  <PokemonList />
                </Route>
                <Route path="/my-pokemon">
                  <MyPokemon />
                </Route>
                <Route path="/detail/:name">
                  <PokemonDetail />
                </Route>
                <Route path="/setting">
                  <Setting />
                </Route>
              </Switch>
            </MenuBar>
          </Alpha>
        </ThemeProvider>
      </HashRouter>
    </div>
  );
}

const Alpha = styled.div`
  background-color: #FEFEFE;
  min-height: 100vh;
`
export default App;
