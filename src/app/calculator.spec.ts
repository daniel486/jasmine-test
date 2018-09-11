//El mantra de las 3 A, Arrange, Act, Assert (Preparar, Actuar, Verificar)
//before each es como un preparador para evitar tener que definir algo muchas veces, es como
//hacer de forma global una declaracion para evitar tener que escribirlo en cada it

//Tambien hay un after each

//Se pueden añadir unos focus para que solo se corran las pruebas que se desean, de este modo
//el resto de pruebas seran saltadas, para hacer esto se antepone una f al describe si se quiere hacer
//focus en todo el conjunto o al it si se quiere correr una prueba particular. (fdescribe, fit).

import { Calculator } from './calculator'

describe('Test for Calculator', () => {
    describe('Test for multiply', () => {
        it('should return 35', () => {
            //Arrange
            let calculator = new Calculator();
            //Act
            let result = calculator.multiply(5,7);
            //Assert
            expect(result).toEqual(35);

        })
        it('should return 25', () => {
            //Arrange
            let calculator = new Calculator();
            //Act
            let result = calculator.multiply(5,5);
            //Assert
            expect(result).toEqual(25);

        })
    })

    let calculator;
    beforeEach(() => {
        calculator = new Calculator();
    })
    describe('Test for divide', () => {
        it('divide for a number, this specific case should return 4', () => {
            let result = calculator.divide(16,4);
            expect(result).toEqual(4);
        })
        it('divide by zero, should return null', () => {
            let result = calculator.divide(4, 0);
            expect(result).toBeNull;
        })
    })
    describe('another type of tests', () => {
        it('test of matchers', () => {
            let name = "Daniel";
            let undefinedname;
            expect(name).toBeDefined();
            expect(undefinedname).toBeUndefined();

            expect(1+2 == 3).toBeTruthy();
            expect(1+1 == 3).toBeFalsy();

            expect(5).toBeLessThan(10);
            expect(20).toBeGreaterThan(10);

            expect('123456').toMatch(/123/);

            expect(["apples", "oranges", "pears"]).toContain("pears")
        })
    })
})