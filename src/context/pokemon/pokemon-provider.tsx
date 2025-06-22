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
        if (localStorage.getItem('pokemon-game')){
            const {
                isPokemonVisible = true,
                pokemonId = 0,
                showBackImage= false,
            } = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState

            pokemonGame.isPokemonVisible = isPokemonVisible
            pokemonGame.pokemonId = pokemonId
            pokemonGame.showBackImage = showBackImage
        }
        
    })
    useVisibleTask$(({track})=>{
        track(()=>[pokemonGame.isPokemonVisible,pokemonGame.pokemonId,pokemonGame.showBackImage])
        localStorage.setItem('pokemon-game',JSON.stringify(pokemonGame));
    })


  return <Slot/>
});

