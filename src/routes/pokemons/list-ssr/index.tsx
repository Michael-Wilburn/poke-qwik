import { component$, useComputed$ } from '@builder.io/qwik';
import { type DocumentHead, Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { Modal } from '~/components/shared';
import { getSmallPokemons } from '~/helpers/get-pokemons';
import {SmallPokemon } from '~/interfaces';

export const usePokemonList = routeLoader$<SmallPokemon[]>(async({query, redirect, pathname})=>{
    const offset = Number(query.get('offset'))
    if (isNaN(offset)){ throw redirect(301, pathname)}

    return await getSmallPokemons(offset)
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
                <PokemonImage id={pokemon.id} />
                <span class="capitalize">{pokemon.name}</span>
            </div>
            ))}
        </div>
        <Modal>
            <div q:slot='title'>Nombre del Pokemon</div>
            <div q:slot='content' class="flex flex-col justify-center items-center">
                <PokemonImage id={1} />
                <span>Preguntandole a ChatGPT</span>
            </div>
        </Modal>
        </>
  )
});

export const head: DocumentHead = {
    title: "List SSR",
  };
 