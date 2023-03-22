import React, { useEffect, useState } from 'react';
import { getPokemonDetails } from './services/getPokemonDetails';
import { PokemonDetails } from '../pokemon/interfaces/PokemonDetails';
import { AppBar, Badge, Box, Container, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Favorite } from '@mui/icons-material';
import { useContext } from 'react';
import { FavoriteContext } from './../favoritos/contexts/FavoriteContext';

interface PokemonDetailProps {
    
}

interface PokemonQueryParams {
    name: string;
}

export const PokemonDetail: React.FC<PokemonDetailProps> = () => {
    const { goBack } = useHistory();
    const { name } = useParams<PokemonQueryParams>();
    // const [selectedPokemonDetails, setSelectedPokemonDetails] = useState<PokemonDetails | undefined>(undefined);

    const {data} = useQuery(`getPokemonDetails-${name}`, () => getPokemonDetails(name));
    const selectedPokemonDetails = data;
    const { favorites, setFavorites } = useContext(FavoriteContext);

    const addPokemonToFavorite = () => {
        if(!selectedPokemonDetails) return;
        setFavorites([...favorites, selectedPokemonDetails])
      }
    
      const removePokemonFromFavorites = () => {
        if(!selectedPokemonDetails) return;
        setFavorites(favorites.filter((poke) => poke.name !== selectedPokemonDetails?.name));
      }

    
    
    const isFavorite = favorites.some((poke) => poke.name === selectedPokemonDetails?.name);
    console.log('favo', isFavorite)

    // const addPokemonToFavorite = () => {
    //     if(!selectedPokemonDetails) return;
    //     setFavorites([...favorites, selectedPokemonDetails])
    // }
    
    // const removePokemonFromFavorites = () => {
    //     if(!selectedPokemonDetails) return;
    //     setFavorites(favorites.filter((poke) => poke.name !== selectedPokemonDetails.name));
    
    // const isFavorite = favorites.some((poke) => poke.name === selectedPokemonDetails.name);

    //esse useEffect foi refatorado para o uso do react query
    // useEffect(() => {
    //     if(!name) return;
    //     getPokemonDetails(name).then((response) => setSelectedPokemonDetails(response))
    // }, [name]);

    return (
        <div>
            <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" size="large">
                {/* <MenuIcon /> */}
                <button onClick={goBack}>
                    Voltar
                </button>
                </IconButton>
                <Typography variant="h6" >
                    {name}
                </Typography>
                <IconButton aria-label="add to favorites" onClick={() => isFavorite ? removePokemonFromFavorites() : addPokemonToFavorite()}>
                    <Favorite color={isFavorite ? 'error' : 'disabled'}/>
                </IconButton>
            </Toolbar>
            </AppBar>
            <Container maxWidth='lg'>
                <Box mt={10} style={{marginTop: '40px'}}>
                    {/* Pokemon selecionado: {name} */}
                    <img width='100%' height='auto' src={selectedPokemonDetails?.sprites.front_default} alt={name}/>
                    {/* <h2>Pokemon selecionado: {selectedPokemon?.name || 'Nenhum pokemon selecionado'}</h2>*/}

                    {/* {JSON.stringify(selectedPokemonDetails?.sprites.front_default, undefined, 2)} */}
                    <Typography variant='h2'>
                        {selectedPokemonDetails?.name}
                    </Typography>
                    {selectedPokemonDetails?.types.map((type) => <Typography>{type.type.name}</Typography>)}
                    <Box style={{display:'flex', flexDirection:'row'}}>
                        <Typography>
                            Espécie: 
                        </Typography>
                        <Typography>
                            {selectedPokemonDetails?.species.name}
                        </Typography>
                    </Box>
                    <Box style={{display:'flex', flexDirection:'row'}}>
                        <Typography>
                            Altura: 
                        </Typography>
                        <Typography>
                            {selectedPokemonDetails?.height}
                        </Typography>
                    </Box>
                    <Box style={{display:'flex', flexDirection:'row'}}>
                        <Typography>
                            Peso: 
                        </Typography>
                        <Typography>
                            {selectedPokemonDetails?.weight}
                        </Typography>
                    </Box>
                    <Box style={{display:'flex', flexDirection:'row'}}>
                        <Typography>
                            Abilidade: 
                        </Typography>
                        <Typography>
                            {selectedPokemonDetails?.abilities.map((ability) => <Typography>{ability.ability.name}</Typography>)}
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default PokemonDetail;