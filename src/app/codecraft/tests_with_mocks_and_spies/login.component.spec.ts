import {LoginComponent} from './login.component';
import {AuthService} from './auth.service'; //Se necesita en el caso de que se vayan a sobreescribir

//false classes one way of mocking
/*class MockedAuthService {
    authenticated = false;

    isAuthenticated() {
        return this.authenticated;
    }
}*/

//extending classes and overriding functions another way of mocking
/*class MockedAuthService extends AuthService {
    authenticated = false;

    isAuthenticated() {
        return this.authenticated;
    }
}*/

//Existe otra manera de hacer mocking (con spies), esto usa una instancia real de la clase y hace que retornemos lo que necesitamos

describe('Component: Login', () => {
    let component: LoginComponent;
    let service: AuthService;
    //let service: MockedAuthService;

    beforeEach(() => {
        service = new AuthService();
        //service = new MockedAuthService();
        component = new LoginComponent(service);
    });

    afterEach(() => {
        //localStorage.removeItem('token');
        service = null;
        component = null;
    });

    it('needsLogin returns true when the user is not authenticated', () => {
        //service.authenticated = false;
        spyOn(service, 'isAuthenticated').and.returnValue(false); // se le pasa el objeto (instancia de AuthService) con el que se hara el spy y el segundo parametro es la funcion
        //a la que se le hara el spy.
        expect(component.needsLogin()).toBeTruthy();
        expect(service.isAuthenticated).toHaveBeenCalled();
    });

    it('needsLogin returns false when the user is authenticated', () => {
        //localStorage.setItem('token', '12345');
        //service.authenticated = true;
        spyOn(service, 'isAuthenticated').and.returnValue(true);
        expect(component.needsLogin()).toBeFalsy();
        expect(service.isAuthenticated).toHaveBeenCalled();
    });
})