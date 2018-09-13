import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from "./auth.service";

class MockAuthService extends AuthService {
    isAuthenticated() {
        return 'Mocked';
    }
}


describe('Component: Login', () => {

    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let testBedService: AuthService;
    let componentService: AuthService;

    beforeEach(() => {

        // refine the test module by declaring the test component
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            providers: [AuthService]
        });

        // Configure the component with another set of Providers para usar el MockAuthService.
        //Esta sintaxis es bastante especifica, es llamada MetaDataOverride y puede tener propiedades
        //como set, add y remove. Usaremos ser para reemplazar completamente el array de providers con los valores que deseamos
        TestBed.overrideComponent(
            LoginComponent,
            { set: { providers: [{ provide: AuthService, useClass: MockAuthService }] } }
        );

        // create component and test fixture
        fixture = TestBed.createComponent(LoginComponent);

        // get test component from the fixture
        component = fixture.componentInstance;

        // AuthService provided to the TestBed
        testBedService = TestBed.get(AuthService);

        // AuthService provided by Component, (should return MockAuthService)
        componentService = fixture.debugElement.injector.get(AuthService);
    });


    it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
        //La funcion inject encapsula la funcion de prueba, pero tambien nos permite inyectar dependencias
        //usando el inyector padre en el TestBed como
        //inject(
        //  [toekn1, token2, token3],   Este parametro es un arreglo de tokens para los cuales queremos resolver dependencias
        //  (dep1, dep2, dep3) => {} Este parametro es una funcion donde los argumentos son dependencias resueltas
        //)
        inject([AuthService], (injectService: AuthService) => {
            expect(injectService).toBe(testBedService);
        })
    );

    it('Service injected via component should be and instance of MockAuthService', () => {
        expect(componentService instanceof MockAuthService).toBeTruthy();
    });
});