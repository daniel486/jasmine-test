import {
    Directive,
    HostListener,
    HostBinding
} from '@angular/core';

@Directive({
    selector: '[hoverfocus]'
})

export class HoverFocusDirective {
    //Se usa el HostBinding para modificar la propiedad de estilo del host element
    @HostBinding("style.background-color") backgroundColor: string;

    //USa HostListener para activar las escuchas para los eventos mouseover y mouseout
    @HostListener('mouseover') onHover() {
        this.backgroundColor = 'yellow';
    }

    @HostListener('mouseout') ondragleave() {
        this.backgroundColor = 'inherit';
    }
}