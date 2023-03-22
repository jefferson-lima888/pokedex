import React from 'react';
// import { Router } from 'react-router-dom';
// import Pokedex from './pokedex/Pokedex';
import { BrowserRouter as Router } from "react-router-dom";
import Routers from './routes';
import { QueryClient, QueryClientProvider} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { FavoriteProvider } from './favoritos/contexts/FavoriteContext';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { 
      staleTime: 5000,
      cacheTime: 100 * 60 * 60 * 15,
      retry: 10,
      retryDelay: 1000,
      refetchOnWindowFocus: true
    }
  }
})

const App: React.FC = () => {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <FavoriteProvider>
        <Router>
          {/* <Pokedex/> */}
          <Routers/>
        </Router>
      </FavoriteProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </>
  )
}

export default App;
