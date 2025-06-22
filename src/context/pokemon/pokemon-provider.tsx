import { component$, Slot,useContextProvider, useStore, useVisibleTask$} from "@builder.io/qwik";
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

    useVisibleTask$(()=>{
        //Leer de local storage
        console.log('Primer visible task');
        
    })
    useVisibleTask$(({track})=>{
        track(()=>[pokemonGame.isPokemonVisible,pokemonGame.pokemonId,pokemonGame.showBackImage])
        localStorage.setItem('pokemon-game',JSON.stringify(pokemonGame));
        
    })


  return <Slot/>
});

