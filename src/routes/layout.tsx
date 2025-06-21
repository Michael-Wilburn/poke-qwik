import { component$, Slot } from '@builder.io/qwik';
import Navbar from "~/components/shared/navbar/navbar"
 
export default component$(() => {
  return (
    <>
        <Navbar />
        <main class="flex flex-col items-center justify-center">
            <Slot /> 
        </main>
    </>
  );
});