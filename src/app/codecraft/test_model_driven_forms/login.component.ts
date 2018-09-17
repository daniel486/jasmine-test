import { Component, EventEmitter, Output } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

export class User {
    constructor(
        public email: string,
        public password: string
    ) {

    }
}

@Component({
    selector: 'app-login',
    //Cuando el usuario envia el formulario (submit), llamara la funcion login()
    //Tambien asociamos el elemento form del template con el model form en nuestro componente
    //Enlazamos form controls especificos a FormControls en nuestro form model (email y password)
    template: `
    <form (ngSubmit)="login()"
            [formGroup]="form">
        <label>Email</label>
        <input type="email"
            formControlName="email">
        <label>Password</label>
        <input type="password"
            formControlName="password">
        <button type="submit">Login</button>
    </form>
    `
})

export class LoginComponent {
    @Output() loggedIn = new EventEmitter<User>();
    form: FormGroup;

    constructor(private fb: FormBuilder) {

    }

    //Inicializamos el form model en el ngOnInit
    ngOnInit() {
        this.form = this.fb.group({
            email: ['', [
                Validators.required,
                Validators.pattern("[^ @]*@[^ @]*")]],
            password: ['', [
                Validators.required,
                Validators.minLength(8)]],
        });
    }

    login() {
        console.log(`Login ${this.form.value}`);
        if(this.form.valid) {
            this.loggedIn.emit(
                new User(
                    this.form.value.email,
                    this.form.value.password
                )
            );
        }
    }
}