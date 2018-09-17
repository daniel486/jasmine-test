import { Location } from "@angular/common";
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";

import {
    HomeComponent,
    SearchComponent,
    AppComponent,
    routes
} from "./router"

describe('Router: App', () => {

    let location: Location;
    let router: Router;
    let fixture;

    beforeEach(() => {
        TestBed.configureTestingModule({
            //El RouterTestingModule modifica el router con una implementacion de un Spy que usa una
            //Location Strategy que no cambia la URL.
            //Se importa RouterTestingModule con nuestras rutas
            imports: [RouterTestingModule.withRoutes(routes)],
            declarations: [
                //Declaramos nuestros componentes en la configuracion de Test Bed
                HomeComponent,
                SearchComponent,
                AppComponent
            ]
        });

        //Referencia al Router inyectado
        router = TestBed.get(Router);
        //Referencia al Location inyectado
        location = TestBed.get(Location);

        //Creamos una instancia de AppComponent. No necesitamos esta referencia en nuestros test specs
        //Pero si necesitamos crear el componente raiz con el router-outlet, para que el router tenga
        //donde insertar los componentes.
        fixture = TestBed.createComponent(AppComponent);
        //Esta funcion modifica la escucha para el cambio de localizacion y realiza la navegacion inicial.
        //this is trash
        //router.initialNavigation();
    });

    fit('fakeAsync works', fakeAsync(() => {
        let promise = new Promise((resolve) => {
            setTimeout(resolve, 10)
        });
        let done = false;
        promise.then(() => done = true);
        tick(50);
        expect(done).toBeTruthy();
    }));

    //El enrutamiento es una actividad asincrona, asi que usaremos fakeAsync para manejarlas
    fit('navigate to "" redirects you to /home', fakeAsync(() => {
        //Lanzamos la funcion navigate para ir a la ruta vacia
        router.navigate(['']);
        tick();
        expect(location.path()).toBe('/home');
    }));

    it('navigate to "search" takes you to /search', fakeAsync(() => {
        router.navigate(['/search']);
        tick();
        expect(location.path()).toBe('/search');
    }));
});