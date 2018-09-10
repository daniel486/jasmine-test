import { Component } from '@angular/core';
import { Calculator } from './calculator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jasmine-test';

  ngOnInit(){
    let calculator = new Calculator();
    let result = calculator.multiply(3,3);
    console.log(result === 9);
    console.log(result !== 12);
    let result2 = calculator.divide(6,2);
    console.log(result2 === 3);
    console.log(result2 !== 1);
  }
}
