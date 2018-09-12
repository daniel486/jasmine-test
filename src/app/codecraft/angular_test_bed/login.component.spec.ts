//Angular Test Bed es un framework de pruebas en angular de alto nivel, que permite testear facilmente
//los ambientes que dependen de un framework de Angular.

//El ATB permite testear la interaccion de una directiva o de un componente con su template.
//Permite testear la deteccion de cambios, testear y usar el framework de inyeccion de dependencias de Angular.
//Permite testear bajo la misma configuracion del NgModule que usamos en nuestra aplicacion.
//Permite testear la interaccion del usuario via clicks y campos de entrada (inputs).

//Por lo anterior el ATB nos permite testear nuestro codigo en el contexto de una aplicacion Angular real.

import {TestBed, ComponentFixture} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {AuthService} from './auth.service';

describe('Component: Login', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>; //fixture es un contenedor para el componente y su template
    let authService: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({  //se configura un modulo de testeo desde una clase TestBed, lo que crea un
            //modulo de testeo de angular para instanciar componentes, realizar injeccion de dependencias, etc. Este 
            //modulo se configura de la misma manera que se hace con un NgModule
            declarations: [LoginComponent],
            providers: [AuthService]
        });

        //Al crear un componente via Test Bed, el AuthService se inyecta automaticamente en el constructor del LoginComponent.

        fixture = TestBed.createComponent(LoginComponent); //Crea un componente y fixture de prueba que inyecta el
        //AuthService en el constructor del componente

        component = fixture.componentInstance; //Obtiene el componente de prueba del fixture a traves de componentInstance

        authService = TestBed.get(AuthService); //Con la funcion get que provee el TestBed inyector podemos resolver las dependencias.

        //Dado que el LogicComponent no tiene su propio inyector, el AuthService que se inyecta, es el mismo que obtenemos del TestBed.

    });

    it('needsLogin returns true when the user is not authenticated', () => {
        spyOn(authService, 'isAuthenticated').and.returnValue(false);
        expect(component.needsLogin()).toBeTruthy();
        expect(authService.isAuthenticated).toHaveBeenCalled();
    });

    it('needsLogin returns false when the user is authenticated', () => {
        spyOn(authService, 'isAuthenticated').and.returnValue(true);
        expect(component.needsLogin()).toBeFalsy();
        expect(authService.isAuthenticated).toHaveBeenCalled();
    });
})