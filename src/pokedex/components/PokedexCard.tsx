import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Collapse, IconButton, Typography } from "@mui/material";
import { ExpandMore, Favorite, MoreVert, OpenInBrowser, Share } from "@mui/icons-material";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { PokemonDetails } from "../../pokemon/interfaces/PokemonDetails";
import { PokemonListInterface } from "../../pokemon/services/listPokemons";
import { FavoriteContext } from "../../favoritos/contexts/FavoriteContext";


interface PokedexCardProps {
//   pokemon: PokemonListInterface;
    pokemon: PokemonDetails;
}

// const Card = styled.section`
//   padding: 4em;
//   border-radius: .5em;
//   background: papayawhip;
//   text-align: center;
//   cursor: pointer;
// `;

export const PokedexCard: React.FC<PokedexCardProps> = ({ pokemon }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { favorites, setFavorites } = useContext(FavoriteContext);
  const history = useHistory();

  function handleClick() {
    history.push(`/pokemon/${pokemon.name}`);
  }

  const addPokemonToFavorite = () => {
    setFavorites([...favorites, pokemon])
  }

  const removePokemonFromFavorites = () => {
    setFavorites(favorites.filter((poke) => poke.name !== pokemon.name));
  }

  const isFavorite = favorites.some((poke) => poke.name === pokemon.name);

  return (
    <>
      {/* <Card onClick={handleClick}>{pokemon.name}</Card> */}
      <Card >
      <CardMedia
          style={{height: 0, paddingTop: '56%', width: '66%', margin: '0 auto'}}
          image={pokemon.sprites.front_default}
          title={pokemon.name}
          onClick={handleClick}
        />

        <CardHeader
          // avatar={
          //   <Avatar aria-label="recipe">
          //     R
          //   </Avatar>
          // }
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVert />
          //   </IconButton>
          // }
          title={pokemon.name}
          subheader={pokemon.types.map((type) => <Chip label={type.type.name} />)}
        />
        <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={() => isFavorite ? removePokemonFromFavorites() : addPokemonToFavorite()}>
          <Favorite color={isFavorite ? 'error' : 'disabled'}/>
        </IconButton>
      </CardActions>
      </Card>
    </>
  );
};

export default PokedexCard;
