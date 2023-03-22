import axios from "axios";
import { getPokemonDetails } from "./getPokemonDetails";
import { PokemonDetails } from './../interfaces/PokemonDetails';

export interface PokemonListInterface {
    name: string;
    url: string;
}

interface ListPokemonsIterface {
    count: number;
    next: null | string;
    previous: null | string;
    // results: PokemonListInterface[]
    results: PokemonDetails[]
}


export async function listPokemons(): Promise<ListPokemonsIterface> {
    const endpoint = `${process.env.REACT_APP_POKEAPI}/pokemon`;
    const response = await axios.get<ListPokemonsIterface>(endpoint);

    const promiseArr = response.data.results.map(({name}) => getPokemonDetails(name))
    const resultsPromise = await Promise.all(promiseArr)

    //simular a tempo da API pra que demore 2 seg
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
        ...response.data,
        results: resultsPromise
    };
}