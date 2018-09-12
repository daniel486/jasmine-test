import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {AuthService} from './auth.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('Component: Login', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: AuthService;
    let el: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            providers: [AuthService]
        });

        

        fixture = TestBed.createComponent(LoginComponent);

        component = fixture.componentInstance;

        authService = TestBed.get(AuthService);

        //Se guarda una referencia a un elemento DOM (un elemento HTML como una etiqueta ya sea p, div, a, entre otras)
        //El fixture tambien mantiene una referencia hacia algo llamado un DebugElement, que es un contenedor de elementos
        //DOM de bajo nivel, que representa el view de los componentes, por la propiedad debugElement.
        //Podemos obtener referencias a otros nodos hijos haciendo una query con la clase By. Esta clase By nos permite
        //hacer query usando un numero de metodos, uno es via clase css como la que tenemos en este ejemplo, la otra manera
        //es haciendo la peticion por un tipo de directiva como By.directive(MiDirectiva).
        el = fixture.debugElement.query(By.css('a'));
    });

    it('login button hidden when the user is authenticated', () => {
        //con el.nativeElement.textContent.trim() podemos obtener el texto de la etiqueta.
        //Inicialmente se espera que el texto en la etiqueta a este vacio porque la primera carga de Angular
        //no ha disparado un trigger para deteccion de cambios, entonces la view, no mostrara el texto Login
        //o Logout.
        expect(el.nativeElement.textContent.trim()).toBe('');
        //Con el fixture se puede controlar la deteccion de cambios, para hacer esto se llama a la funcion
        //fixture.detectChanges() de manera que el texto se actualizara, luego de lanzar (trigger) la deteccion.
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toBe('Login');
        spyOn(authService, 'isAuthenticated').and.returnValue(true);
        expect(el.nativeElement.textContent.trim()).toBe('Login');
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toBe('Logout');
    });
})