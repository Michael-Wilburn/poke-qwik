import { component$, Slot, useContextProvider, useStore} from '@builder.io/qwik';
import Navbar from "~/components/shared/navbar/navbar"
import { PokemonGameContext,PokemonListContext, type PokemonGameState, type PokemonListState } from '~/context';
// import styles from "./styles.css?inline"


 
export default component$(() => {
    // useStyles$(styles);
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
    return (
    <>
        <Navbar />
        <main class="flex flex-col items-center justify-center">
            <Slot /> 
        </main>
    </>
  );
});

