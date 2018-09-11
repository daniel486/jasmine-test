import { compute } from './compute';
// describe() define a suite, like a group of test relationed between them,
//recibe dos argumentos, el primero generalmente es el nombre del systema
//que se esta testeando, el segundo es una funcion que el test runner llamara


// it() define a test or a spec, este se llama de manera similar al describe, se define dentro de la funcion
//del describe y recibe un nombre de prueba y una funcion

//se puede definir como funcion
//describe('compute', function(){
//})

//Jasmine tambien provee una funcion expect que viene con multiples metodos dependiendo de lo que se pueda necesitar
//en el

//o con el arrow function
describe('compute', () => {
    it('should return zero if input is negative', () => {
        const result = compute(-1);
        expect(result).toBe(0);
    })
    it('Should increment the input if it is positive', () => {
        const result = compute(43);
        expect(result).toBe(44);
    })
})