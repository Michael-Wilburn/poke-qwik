import { component$, type PropFunction, Slot, useStylesScoped$ } from '@builder.io/qwik';
import ModalStyles from './modal.css?inline';

interface Props{
    showModal: boolean,
    closeFn: PropFunction<() => void>
}

export const Modal = component$( ({showModal, closeFn}:Props) => {

    useStylesScoped$(ModalStyles);

    return (
        // hidden https://www.section.io/engineering-education/creating-a-modal-dialog-with-tailwind-css/
        <div class={showModal? 'modal-background' : 'hidden'} onClick$={closeFn}>
            <div class="modal-content" onClick$={(e) => e.stopPropagation()}>
                <div class="mt-3 text-center">
                    <h3 class="modal-title"><Slot name='title'/></h3>
                    <div class="mt-2 px-7 py-3">
                        <div class="modal-content-text">
                            <Slot name='content'/>
                        </div>
                    </div>
                    {/* Botton */}
                    <div class="items-center px-4 py-3">
                        <button
                            id="ok-btn"
                            class="modal-button"
                            onClick$={closeFn}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
});