import { component$} from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export const usePokemonId = routeLoader$<number>((event)=>{
  const id = Number(event.params.id)
  if (isNaN(id)) throw event.redirect(301, "/");
  if (id <= 0) throw event.redirect(301, "/");
  if (id > 1025) throw event.redirect(301, "/");
  return id
})

export default component$(() => {
  const pokemonId = usePokemonId();

  return(
    <>
      <span class="text-5xl">Pokemon: {pokemonId}</span>
      <PokemonImage id={pokemonId.value}/>
    </>
  )
});