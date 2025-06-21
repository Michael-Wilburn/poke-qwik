import { component$ } from "@builder.io/qwik";
import { QwikLogo } from "~/components/icons/qwik";


export default component$(()=>{
    return(
        <header>
            <div class="flex flex-row justify-between items-center p-8">
                <div>
                    <a href="/">
                        <QwikLogo height={50} />
                    </a>
                </div>
                <ul>
                    <li>
                        <a href="\">Inicio</a>
                    </li>
                </ul>
            </div>
        </header>
    )
})