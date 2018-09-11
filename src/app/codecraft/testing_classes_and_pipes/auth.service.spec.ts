import { AuthService } from './auth.service';

describe('Service: Auth', () => {

  let service: AuthService;

  beforeEach(() => {
    service = new AuthService();
  });

  afterEach(() => {
    service = null;
    localStorage.removeItem('token');
  });

  it('should be true from isAuthenticated when there is a token', () => {
    localStorage.setItem('token', '123');
    expect(service.isAuthenticated()).toBeTruthy();
  });

  //Antes de correr esto no hay nada en el localStorage porque el afterEach fue ejecutado antes
  it('should be false from isAuthenticated when there is no a token', () => {
    expect(service.isAuthenticated()).toBeFalsy();
  })
});
