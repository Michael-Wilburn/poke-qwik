import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { QwikLogo } from "~/components/icons/qwik";


export default component$(()=>{
    return(
        <header>
            <div class="flex flex-row justify-between items-center p-10">
                <div>
                    <Link href="/">
                        <QwikLogo height={50} />
                    </Link>
                </div>
                <ul class="flex flex-row justify-between items-center">
                    <li class="mr-2">
                        <Link href="/pokemons/list-ssr/">SSR-List</Link>
                    </li>
                    <li>
                        <Link href="/pokemons/list-client/">Client-List</Link>
                    </li>
                </ul>
            </div>
        </header>
    )
})