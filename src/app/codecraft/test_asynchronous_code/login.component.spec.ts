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

    it('Text in the button label', (done) => {
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toBe('Login');
        let spy = spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
        component.ngOnInit();
        spy.calls.mostRecent().returnValue.then(() => {
            fixture.detectChanges();
            expect(el.nativeElement.textContent.trim()).toBe('Logout');
            done();
        });
        
    });

    it('Text in the button label', async(() => {
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toBe('Login');
        let spy = spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
        component.ngOnInit();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(el.nativeElement.textContent.trim()).toBe('Logout');
        });
        
    }));
    
    it('Text in the button label', fakeAsync(() => {
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toBe('Login');
        let spy = spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
        component.ngOnInit();

        tick();
        
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toBe('Logout');
        
    }));
})