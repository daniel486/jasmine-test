import {TestBed, ComponentFixture} from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent, User } from './login.component';

describe('Component: Login', () => {

    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule],
            declarations: [LoginComponent]
        });

        fixture = TestBed.createComponent(LoginComponent);

        component = fixture.componentInstance;
        component.ngOnInit();
    });

    it('Should check if an empty form is invalid', () => {
        expect(component.form.valid).toBeFalsy();
    })
});