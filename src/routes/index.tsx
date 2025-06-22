import { $, component$, useContext} from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { PokemonGameContext } from "~/context";

export default component$(() => {
  const nav = useNavigate();

  // const pokemonId = useSignal(1);
  // const showBackImage = useSignal(false);
  // const isPokemonVisible = useSignal(false);

  const pokemonGame = useContext(PokemonGameContext);


  const changePokemonId = $((value: number) => {
    if((pokemonGame.pokemonId + value) <= 0 || pokemonGame.pokemonId >=1025){
      return;
    }
    pokemonGame.pokemonId+=  value
  })

  const goToPokemon = $((id : number) =>{
    nav(`/pokemon/${id}`);
  })

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemonGame.pokemonId}</span>
      {/* <Link href={`/pokemon/${pokemonId.value}/`}>
      </Link> */}
      <div onClick$={()=>goToPokemon(pokemonGame.pokemonId)}>
        <PokemonImage id={pokemonGame.pokemonId} size={200} backImage={pokemonGame.showBackImage} isVisible={!pokemonGame.isPokemonVisible}/>
      </div>
      <div class="mt-2">
        <button onClick$={()=>changePokemonId(-1)} class="btn-primary mr-2">Anterior</button>
        <button onClick$={()=>changePokemonId(1)} class="btn-primary mr-2">Siguiente</button>
        <button onClick$={()=>pokemonGame.showBackImage = !pokemonGame.showBackImage} class="btn-primary mr-2">Voltear</button>
        <button onClick$={()=>pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible} class="btn-primary">Revelar</button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "Pokemon site",
    },
  ],
};
