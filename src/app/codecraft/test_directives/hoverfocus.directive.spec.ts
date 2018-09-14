import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { HoverFocusDirective } from "./hoverfocus.directive";


//Para testear una directiva normalmente se crea un componente ficticio de manera que
//podamos interactuar con la directiva y testear su efecto en la vista del componente.
//Estos componentes ficticios pueden ser creados usando Angular Test Bed y podemos
//interactuar con el usando un component fixture.
@Component ({
    //La directiva se asocia con un input en la vista del componente
    template: '<input type="text" hoverfocus>'
})

class TestHoverFocusComponent {

}

describe('Directive: HoverFocus', () => {

    let component: TestHoverFocusComponent;
    let fixture: ComponentFixture<TestHoverFocusComponent>;
    let inputEl: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            //Se declaran la directiva que se quiere testear y el componente ficticio para la prueba
            declarations: [HoverFocusDirective, TestHoverFocusComponent]
        });

        //Tomamos una referencia al component fixture, asi como al componente y al input DebugElement desde
        //la vista del componente
        fixture = TestBed.createComponent(TestHoverFocusComponent);
        component = fixture.componentInstance;
        inputEl = fixture.debugElement.query(By.css('input'));

    });

    it('When hovering over input background turns yellow', () => {
        //Se usa el triggerEventHandler para simular los eventos, en este caso se simula el
        //evento mouseover sobre el inputEl, de este modo es como si el mouse se posicionara
        //sobre el input en la vista.
        inputEl.triggerEventHandler('mouseover', null);
        fixture.detectChanges();
        //La propiedad style en el nativeElement es lo que podemos inspeccionar para ver el
        //estilo que se aplico al elemento en el momento.
        expect(inputEl.nativeElement.style.backgroundColor).toBe('yellow');

        inputEl.triggerEventHandler('mouseout', null);
        fixture.detectChanges();
        expect(inputEl.nativeElement.style.backgroundColor).not.toBe('yellow');
    })
});