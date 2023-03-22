import axios from "axios";
import { PokemonDetails } from "../interfaces/PokemonDetails";

// export interface PokemonListInterface {
//     name: string;
//     url: string;
// }

// interface GetPokemonDetailsIterface {
//     count: number;
//     next: null | string;
//     previous: null | string;
//     results: PokemonListInterface[]
// }


export async function getPokemonDetails(name: string | undefined): Promise<PokemonDetails> {
    const endpoint = `${process.env.REACT_APP_POKEAPI}/pokemon/${name}`;
    const response = await axios.get<PokemonDetails>(endpoint);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return response.data;
}