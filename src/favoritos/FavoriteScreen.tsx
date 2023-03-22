import React, { useContext, useState } from "react";
import {
  listPokemons,
  PokemonListInterface,
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
import { useQuery } from "react-query";
import { Favorite } from '@mui/icons-material';
import { FavoriteContext } from "../favoritos/contexts/FavoriteContext";
import PokedexCard from "../pokedex/components/PokedexCard";

interface FavoriteScreenProps {}

const FavoriteScreen: React.FC<FavoriteScreenProps> = () => {
  
  const { favorites } = useContext(FavoriteContext);
  const { push } = useHistory();
//   const favoriteCount = favorites.length;

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" size="large" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Favoritos</Typography>
            {/* <IconButton size="large" aria-label="show more" aria-haspopup="true" color="inherit" onClick={() => push('/favoritos')}>
              <Badge badgeContent={favoriteCount} color="secondary">
                <Favorite />
              </Badge>
            </IconButton> */}
        </Toolbar>
        {/* {isRefetching && (
          <LinearProgress variant="indeterminate" color="secondary" />
        )} */}
      </AppBar>

      <Container maxWidth="lg">
        {/* mock para ver o FavoriteContext */}
        {/* <pre>{JSON.stringify(favorites.map((detail) => detail.name), undefined, 2)}</pre> */}

        <div style={{ marginTop: "1em" }}>
            <Grid container spacing={2}>
                {favorites?.map((pokemon) => (
                  <>
                    <Grid item xs={6} lg={3}>
                      <PokedexCard pokemon={pokemon} />
                    </Grid>
                  </>
                ))}
            </Grid>
        </div>
      </Container>
    </div>
  );
};

export default FavoriteScreen;
