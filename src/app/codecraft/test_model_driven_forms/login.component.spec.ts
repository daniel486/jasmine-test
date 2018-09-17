//Los Model Driven Forms son mas faciles de probar que los Template Driven Forms dado que con
//los Template Driven Forms, el estado esta en la vista, por esto si el componente no tiene una
//referencia a la template con un decorador ViewChild, no hay manera de probar el formulario usando
//unit test; Por esto se tendria que realizar una prueba E2E para sumular los clicks a los botones
//y la escritura de valores en los formularios.
import {TestBed, ComponentFixture} from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent, User } from './login.component';

describe('Component: Login', () => {

    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            //Para trabajar Test Bed con form debemos agregar el ReactiveFormsModule y el FormsModule
            //en nuestra lista de imports.
            imports: [ReactiveFormsModule, FormsModule],
            declarations: [LoginComponent]
        });

        fixture = TestBed.createComponent(LoginComponent);

        component = fixture.componentInstance;
        //Lanzamos la llamada a ngOnInit en nuestro componente, dado que Angular no hara la llamada
        //por nosotros
        component.ngOnInit();
    });

    //Esta prueba muestra si un formulario en blanco es invalido. Dado que estamos usando model driven forms
    //podemos chequear directamente la propiedad valid en el form model.
    it('Should check if an empty form is invalid', () => {
        //Se puede ver si el formulario es valido con component.form.valid
        expect(component.form.valid).toBeFalsy();
    })

    //Aqui probamos la valides de campos individuales, en este ejemplo el campo email
    //deberia ser invalido inicialmente.
    it('email field validity', () => {
        //Tomamos una referencia al campo a traves de la propiedad form.controls
        let email = component.form.controls['email'];
        //Asi como con el formulario podemos chequear que el campo email sea valido mediante email.valid
        expect(email.valid).toBeFalsy();

        //Asi como verificamos si un campo es valido, podemos ver que validador especifico esta
        //fallando a traves de la propiedad email.errors. Una vez es requerida y el campo email
        //no se ha modificado, deberia fallar el validador required.
        let errors = {};
        errors = email.errors || {};
        console.log(errors['required']);
        //Dado que errors contiene una llave de required y este tiene un valor, esto significa que el validador
        //required esta fallando como se esperaba.
        expect(errors['required']).toBeTruthy();

        //tambien podemos añadir datos a nuestro input control llamando la funcion servalue(..)
        email.setValue("test");
        errors = email.errors || {};
        expect(errors['pattern']).toBeTruthy();
    })

    it('submitting a form emits a user', () => {
        expect(component.form.valid).toBeFalsy();
        component.form.controls['email'].setValue("daniel@test.com");
        component.form.controls['password'].setValue("12345678");

        let user: User;
        //Nos suscribimos al observable y guardamos el usuario en una variable local
        component.loggedIn.subscribe((value) => user = value);

        //Dado que podemos asumir que el ngSubmit propio de angular tiene su propio conjunto de pruebas y es seguro
        //asumimos que la expresion (ngSubmit)=login() trabaja como se espera, asi que para testear el envio del
        //formulario con model driven forms, podemos llamar solo la funcion login() en nuestro componente.
        component.login();

        //Ahora nos aseguramos que el valor emitido es correcto
        expect(user.email).toBe("daniel@test.com");
        expect(user.password).toBe("12345678");
    })
});