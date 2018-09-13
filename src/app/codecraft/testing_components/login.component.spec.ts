//Podemos probar inputs seteando los valores de las propiedades del input en el componente
//Podemos probar outputs suscribiendo a un EventEmitters observable y guardando los valores
//emitidos en variables locales
//

import {TestBed, ComponentFixture} from '@angular/core/testing';
import {LoginComponent, User} from './login.component';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('Component: Login', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let submitEl: DebugElement;
    let loginEl: DebugElement;
    let passwordEl: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent]
        });

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;

        submitEl = fixture.debugElement.query(By.css('button'));
        loginEl = fixture.debugElement.query(By.css('input[type=email]'));
        passwordEl = fixture.debugElement.query(By.css('input[type=password]'));
    });

    //Para testear inputs necesitamos poder cambiar la propiedad enabled del input en nuestro componente,
    //chequear que el boton este habilitado o deshabilitado dependiente del valor de nuestro input property
    it("Should disable submit button if enables is setting to false", () => {
        //Esto cambia el la propiedad input del componente
        component.enabled = false;
        //Se lanza el disparados para detectar cambios y actualizar la vista.
        fixture.detectChanges();
        //Se espera que el submitEl que es el boton este desabilitado, para esto se obtiene
        //el nativeElement que es el elemento del DOM (el boton) y se ve la propiedad disabled
        expect(submitEl.nativeElement.disabled).toBeTruthy();

    });

    //
    it("Entering email and password emits loggedIn event", () => {
        let user: User;
        loginEl.nativeElement.value = "test@example.com";
        passwordEl.nativeElement.value = "1234";

        //Como el output event es un Observable, podemos suscribirnos a el y obtener los callback por
        //cada item emitido. Luego guardaremos el valor emitido en un objeto usuario y entonces agregaremos
        //algunas expectations en el objeto usuario.
        component.loggedIn.subscribe((value) => user = value);
        
        //Aqui podriamos simplemente llamar la funcion component.login(..) pero como queremos lanzarlo desde la
        //vista manejamos el evento del click en el boton.
        submitEl.triggerEventHandler('click', null);

        fixture.detectChanges();
        expect(user.email).toBe("test@example.com");
        expect(user.password).toBe("1234");
    });
});