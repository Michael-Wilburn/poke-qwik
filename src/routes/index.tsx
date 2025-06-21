import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {

  const pokemonId = useSignal(1); //primitivos, booleans, strings;



  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemonId.value + 1}</span>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId.value}.png`} alt="Pokemon Sprite" width={200}  height={300}/>
      <div class="mt-2">
        <button onClick$={()=> pokemonId.value-- } class="btn-primary mr-2">Anterior</button>
        <button onClick$={()=> pokemonId.value++} class="btn-primary">Siguiente</button>
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
