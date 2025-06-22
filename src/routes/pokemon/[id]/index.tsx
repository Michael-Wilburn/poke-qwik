import { component$,useContext} from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

export const usePokemonId = routeLoader$<number>((event)=>{
  const id = Number(event.params.id)
  if (isNaN(id)) throw event.redirect(301, "/");
  if (id <= 0) throw event.redirect(301, "/");
  if (id > 1025) throw event.redirect(301, "/");
  return id
})

export default component$(() => {

  const pokemonGame = useContext(PokemonGameContext);
  const pokemonId = usePokemonId()

  return(
    <>
      <span class="text-5xl">Pokemon: {pokemonId}</span>
      <PokemonImage id={pokemonId.value} size={200} backImage={pokemonGame.showBackImage} isVisible={!pokemonGame.isPokemonVisible}/>
    </>
  )
});