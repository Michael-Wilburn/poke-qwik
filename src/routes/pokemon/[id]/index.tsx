import { component$} from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';

export const usePokemonId = routeLoader$<number>((event)=>{
  const id = Number(event.params.id)
  if (isNaN(id)) throw event.redirect(301, "/");
  if (id <= 0) throw event.redirect(301, "/");
  if (id > 1025) throw event.redirect(301, "/");
  return id
})

export default component$(() => {

  const pokemonId = usePokemonId()

  const {
    showBackImage,
    isPokemonVisible,
    toggleFromBack,
    toggleVisible
  } = usePokemonGame()

  return(
    <>
      <span class="text-5xl">Pokemon: {pokemonId}</span>
      <PokemonImage id={pokemonId.value} size={200} backImage={showBackImage.value} isVisible={!isPokemonVisible.value}/>
      <div class="mt-2">
      <button onClick$={toggleFromBack} class="btn-primary mr-2">Voltear</button>
      <button onClick$={toggleVisible} class="btn-primary">Revelar</button>
      </div>
    </>
  )
});