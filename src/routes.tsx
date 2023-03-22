// import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from "react-router-dom";
import React from 'react';
import Pokedex from "./pokedex/Pokedex";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import PokemonDetail from './pokemon/PokemonDetails';
import FavoriteScreen from './favoritos/FavoriteScreen';


interface RoutersProps {
    
}

export const Routers: React.FC<RoutersProps> = () => {
    

    return (
        <Switch>
          <Route path="/pokemon/:name">
            <PokemonDetail/>
          </Route>
          <Route path="/favoritos">
            <FavoriteScreen/>
          </Route>
          <Route path="/">
            <Pokedex />
          </Route>
        </Switch>
        
    );
};

export default Routers;
