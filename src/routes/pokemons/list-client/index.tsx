import { component$, useStore, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { getSmallPokemons } from '~/helpers/get-pokemons';
import { SmallPokemon } from '~/interfaces';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

interface PokemonPageState {
    currentPage: number;
    pokemons: SmallPokemon[];
}

export default component$(() => {

    const pokemonState = useStore<PokemonPageState>({
        currentPage: 0,
        pokemons:[],
    })

    // useVisibleTask$(async({track})=>{
    //     track(()=>pokemonState.currentPage)
    //     const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
    //     pokemonState.pokemons = pokemons
    // })
    
    useTask$(async({track})=>{
        track(()=>pokemonState.currentPage)
        const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
        pokemonState.pokemons = pokemons
    })

    return(
        <>
        <div class="flex flex-col">
            <span class="my-5 text-5xl">Status:</span>
            <span class="my-5 text-5xl">Pagina Actual:{pokemonState.currentPage}</span>
            <span class="my-5 text-5xl">Loading:</span>
        </div>
        <div class="mt-10">
            <button onClick$={()=> pokemonState.currentPage --} class="btn btn-primary mr-2">Anteriores</button>
            <button onClick$={()=> pokemonState.currentPage ++} class="btn btn-primary mr-2">Siguientes</button>
        </div>
        <div class="grid grid-cols-6 mt-5">
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
  