import { component$, useOnDocument, useStore, useTask$,$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { getSmallPokemons } from '~/helpers/get-pokemons';
import { SmallPokemon } from '~/interfaces';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

interface PokemonPageState {
    currentPage: number;
    isLoading: boolean;
    pokemons: SmallPokemon[];
}

export default component$(() => {

    const pokemonState = useStore<PokemonPageState>({
        currentPage: 0,
        isLoading:false,
        pokemons:[],
    })

    // useVisibleTask$(async({track})=>{
    //     track(()=>pokemonState.currentPage)
    //     const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
    //     pokemonState.pokemons = pokemons
    // })
    
    useTask$(async({track})=>{
        track(()=>pokemonState.currentPage)
        const pokemons = await getSmallPokemons(pokemonState.currentPage * 10,36);
        pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons]
        pokemonState.isLoading = false;
    })

    useOnDocument('scroll', $(() => {
        const maxScroll = document.body.scrollHeight 
        const currenScroll = window.scrollY + window.innerHeight

        if ((currenScroll + 10) >= maxScroll && !pokemonState.isLoading){
            pokemonState.isLoading = true
            pokemonState.currentPage ++
        }
    }))

    return(
        <>
        <div class="flex flex-col">
            <span class="my-5 text-5xl">Status:</span>
            <span class="my-5 text-5xl">Pagina Actual:{pokemonState.currentPage}</span>
            <span class="my-5 text-5xl">Loading:{pokemonState.isLoading ? 'si' : 'no' }</span>
        </div>
        <div class="mt-10">
            {/* <button onClick$={()=> pokemonState.currentPage --} class="btn btn-primary mr-2">Anteriores</button> */}
            <button onClick$={()=> pokemonState.currentPage ++} class="btn btn-primary mr-2">Siguientes</button>
        </div>
        <div class="grid sm:grid-col-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
            {pokemonState.pokemons.map((pokemon)=>(
            <div key={pokemon.name} class="m-5 flex flex-col justify-center items-center">
                <PokemonImage id={pokemon.id} />
                <span class="capitalize">{pokemon.name}</span>
            </div>
            ))}
        </div>
        </>
  )
});

export const head: DocumentHead = {
    title: "List Client",
  };
  