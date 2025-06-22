import { component$, Slot,useContextProvider, useStore} from "@builder.io/qwik";
import { PokemonGameContext,PokemonListContext, type PokemonGameState, type PokemonListState } from '~/context';


export const PokemonProvider = component$(() => {
    const pokemonGame = useStore<PokemonGameState>({
        pokemonId:4,
        isPokemonVisible:true,
        showBackImage:false,
    });
    useContextProvider(PokemonGameContext, pokemonGame)

    const pokemonList = useStore<PokemonListState>({
        currentPage: 0,
        isLoading:false,
        pokemons:[],
    })
    useContextProvider(PokemonListContext, pokemonList)
  return <Slot/>
});

