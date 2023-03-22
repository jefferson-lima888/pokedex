// import axios from "axios";
import React, { useContext } from "react";
// import { PokemonDetails } from "../pokemon/interfaces/PokemonDetails";
// import { getPokemonDetails } from "../pokemon/services/getPokemonDetails";
import {
  listPokemons,
} from "../pokemon/services/listPokemons";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Badge,
  Box,
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import PokedexCard from "./components/PokedexCard";
import { useQuery } from "react-query";
// import { timeUntilStale } from "react-query/types/core/utils";
import { Favorite } from '@mui/icons-material';
import { FavoriteContext } from "../favoritos/contexts/FavoriteContext";

interface PokedexProps {}
// interface foi adicionado ao services
// interface PokemonListInterface {
//     name: string;
//     url: string;
// }

//mock para verificar os states
// const pokemonsArray: string[] = ['Picachu', 'Ditto', 'Metapod', 'Magikarp']

// async function getDetailsFromPokemon(pokemon: PokemonListInterface) {

// }

const Pokedex: React.FC<PokedexProps> = () => {
  // const [pokemons, setPokemons] = useState<PokemonListInterface[]>([]);
  // const [pokemons, setPokemons] = useState<PokemonDetails[]>([]);
  // const [selectedPokemon, setSelectedPokemon] = useState<
  //   PokemonListInterface | undefined
  // >(undefined);
  // const [selectedPokemonDetails, setSelectedPokemonDetails] = useState<PokemonDetails | undefined>(undefined);
  //essa const foi para o componente PokedexCard
  // const history = useHistory();

  const { favorites } = useContext(FavoriteContext);
  const { push } = useHistory();
  const {data, isLoading, isRefetching, refetch, isStale } = useQuery(
    `listPokemons`,
    listPokemons,
    {
      onSuccess: (data) => console.log('Sucesso'),
      onError: (error) => console.log('Error'),
      onSettled: (data) => console.log('Settled'),
    }
  );

  const favoriteCount = favorites.length;


  //esse useEffect foi substituido pelo uso do useQuery acima do react query
  // useEffect(() => {
  //     // axios.get(' https://pokeapi.co/api/v2/pokemon').then((response) => setPokemons(response.data.results))
  //     listPokemons().then((response) => setPokemons(response.results))
  // }, []);

  // esse useEffect era para verificar se a API estava retornando o resultado logo no inicio do código
  // useEffect(() => {
  //     // axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon?.name}`).then((response) => setSelectedPokemonDetails(response.data))

  //     getPokemonDetails(selectedPokemon?.name).then((response) => setSelectedPokemonDetails(response))
  // }, [selectedPokemon]);

  //essa função foi para o componente PokedexCard
  // function handleClick(pokemon: PokemonListInterface) {
  //     history.push(`/pokemon/${pokemon.name}`);
  //   }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" size="large" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Pokedex</Typography>
            <IconButton size="large" aria-label="show more" aria-haspopup="true" color="inherit" onClick={() => push('/favoritos')}>
              <Badge badgeContent={favoriteCount} color="secondary">
                <Favorite />
              </Badge>
            </IconButton>
        </Toolbar>
        {isRefetching && (
          <LinearProgress variant="indeterminate" color="secondary" />
        )}
      </AppBar>
      {/* <h1>Pokedex</h1> */}
      <Container maxWidth="lg">
        {/* mock para ver o FavoriteContext */}
        {/* <pre>{JSON.stringify(favorites.map((detail) => detail.name), undefined, 2)}</pre> */}

        <div style={{ marginTop: "1em" }}></div>
        {isStale && (
          <Button
            disabled={isRefetching}
            variant="outlined"
            onClick={() => refetch()}
          >
            Refetch
          </Button>
        )}
        <div style={{ marginTop: "1em" }}></div>
        {!isLoading ? (
          <>
            <Box mt={10} style={{ marginTop: "40px" }}>
              <Grid container spacing={2}>
                {data?.results.map((pokemon) => (
                  <>
                    <Grid item xs={6} lg={3}>
                      {/* <Card variant="outlined">
                                        <CardContent>
                                            <Typography variant="h5" component="h2">
                                                {pokemon.name}
                                            </Typography>
                                        </CardContent>
                                        <CardActions> */}
                      {/* <Button onClick={() => setSelectedPokemon(pokemon)} size="small">Abrir</Button> */}
                      {/* <Button onClick={() => handleClick(pokemon)} size="small">Abrir</Button>
                                        </CardActions>
                                    </Card> */}
                      <PokedexCard pokemon={pokemon} />
                    </Grid>
                  </>
                ))}
              </Grid>

              {/* Pokemons: */}
              {/* {pokemons.map((pokemon) => <button onClick={() => setSelectedPokemon(pokemon)}>{pokemon.name}</button>)} */}

              {/* <h2>Pokemon selecionado: {selectedPokemon?.name || 'Nenhum pokemon selecionado'}</h2> */}

              {/* um jeito para verificar o retorno do objeto, com os detalhes do pokemon */}
              {/* {JSON.stringify(selectedPokemonDetails, undefined, 2)} */}
            </Box>
          </>
        ) : (
          <div>
            <CircularProgress />
          </div>
        )}
      </Container>
    </div>
  );
};

export default Pokedex;
