import React, { useState } from 'react';
import { PokemonDetails } from '../../pokemon/interfaces/PokemonDetails';


interface FavoriteContextProps {
    favorites: PokemonDetails[];
    setFavorites: React.Dispatch<React.SetStateAction<PokemonDetails[]>>;
    
}

interface IProps {
    children: React.ReactNode;
   }

const INITIAL_FAVORITES_VALUE: PokemonDetails[] = [];

// create context
export const FavoriteContext = React.createContext<FavoriteContextProps>({
    favorites: INITIAL_FAVORITES_VALUE,
    setFavorites: () => console.warn('setFavorites is not ready'),
});

export const FavoriteProvider: React.FC<IProps> = ({ children }) => {
    const [favorites, setFavorites] = useState<PokemonDetails[]>(INITIAL_FAVORITES_VALUE);
    return (
        <FavoriteContext.Provider value={{
            favorites,
            setFavorites
            }}>
            
            {children}
        </FavoriteContext.Provider>
    );
};
