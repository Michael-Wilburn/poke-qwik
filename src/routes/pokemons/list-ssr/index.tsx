import { component$, useComputed$ } from '@builder.io/qwik';
import { type DocumentHead, Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { BasicPokemonInfo, PokemonListResponse } from '~/interfaces';

export const usePokemonList = routeLoader$<BasicPokemonInfo[]>(async({query, redirect, pathname})=>{
    const offset = Number(query.get('offset'))
    if (isNaN(offset)){ throw redirect(301, pathname)}

    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
    const data = await resp.json() as PokemonListResponse
    
    return data.results
})

export default component$(() => {
    const pokemons = usePokemonList();
    const location = useLocation();

    const currentOffset = useComputed$<number>(() => {
        const offsetParam = new URLSearchParams(location.url.search).get('offset');
        const offset = Number(offsetParam);
      
        return isNaN(offset) || offset < 0 ? 0 : offset;
    });

    return(
        <>
        <div class="flex flex-col">
            <span class="my-5 text-5xl">Status:</span>
            <span class="my-5 text-5xl">Offset:{currentOffset}</span>
            <span class="my-5 text-5xl">Loading:{location.isNavigating ? 'si' : 'no' }</span>
        </div>
        <div class="mt-10">
        <Link href={`/pokemons/list-ssr/?offset=${Math.max(0, currentOffset.value - 10)}`} class="btn btn-primary mr-2">Anteriores</Link>
        <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`} class="btn btn-primary mr-2">Siguientes</Link>
        </div>
        <div class="grid grid-cols-6 mt-5">
            {pokemons.value.map((pokemon)=>(
            <div key={pokemon.name} class="m-5 flex flex-col justify-center items-center">
                <span class="capitalize">{pokemon.name}</span>
            </div>
            ))}
        </div>
        </>
  )
});

export const head: DocumentHead = {
    title: "List SSR",
  };
  