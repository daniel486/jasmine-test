//

import {TestBed, async, ComponentFixture, fakeAsync, tick} from '@angular/core/testing';
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

        el = fixture.debugElement.query(By.css('a'));
    });

    //Jasmine done function. Para ejecutar la funcion de testeo asincrono de Jasmine se pasa una funcion
    //como el primer parametro, normalmente llamamos a este parametro done
    it('Text in the button label', (done) => {
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toBe('Login');
        let spy = spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
        component.ngOnInit();
        //Añadimos una funcion usando el espia para asegurar que se llame cuando la promesa
        //retornada desde isAuthenticated este resuelta. En esta funcion sabemos que el componente tiene
        //el nuevo valor de needsLogin y podemos añadir nuestra espectativa adicional en este punto.
        spy.calls.mostRecent().returnValue.then(() => {
            fixture.detectChanges();
            expect(el.nativeElement.textContent.trim()).toBe('Logout');
            //Cuando terminen nuestras tareas asincronas le informaremos a Jasmine por la funcion done.
            //Con esto Jasmine nos dejara crear pruebas asincronas dandonos una funcion done explicita
            //la que llamaremos cuando la prueba este completa.
            done();
        });
        
    });

    //async and whenStable. Con esto encapsulamos nuestra funcion test spec en otra funcion llamada async.
    it('Text in the button label', async(() => {
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toBe('Login');
        let spy = spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
        component.ngOnInit();
        //Ubicamos las pruebas que debamos correr luego de quye la promesa isAuthenticated se resuelva dentro de esta funcion.
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(el.nativeElement.textContent.trim()).toBe('Logout');
        });
        
    }));
    
    //fakeAsync and tick. Encapsulamos la funcion de prueba en una funcion llamada fakeAsync
    it('Text in the button label', fakeAsync(() => {
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toBe('Login');
        let spy = spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
        component.ngOnInit();

        //Llamamos la funcion tick(), la cual bloquea la ejecucion y simula el paso del tiempo hasta que
        //todas las actividades asincronas estan completas. donde llamamos tick() todavia hay actividades asincronas
        //pendientesque queremos completar. Asi como con async, la funcion fakeAsync ejecuta el codigo dentro
        //de su cuerpo en una zona de testeo especial "fake async". Esto intercepta y mantiene un seguimiento de las promesas
        //creadas en su cuerpo. De esta manera al llamar a tick() la aplicacion espera por la promesa devuelta desde
        //isAuthenticated para ser resuelta y entonces permite que la ejecucion pase a la siguiente linea. Luego el codigo
        //debajo se encuentra de manera lineal, como si estuvieramos ejecutando codigo sincrono, de esta manera no hay
        //llamadas de vuelta que nos confundan y todo es mas limpio.
        tick();
        
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toBe('Logout');
        
    }));
})