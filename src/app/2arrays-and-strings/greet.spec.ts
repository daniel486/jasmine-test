import {greet} from './greet';

describe('greet', () => {
    it('should include the name in the welcome message', () => {
        const result = greet('Daniel');
        expect(result).toBe('Welcome Daniel');
        //En el anterior tiene que ser igual al output general, pero con el siguiente se previene
        //en caso de que el codigo cambie, asi se puede colocar para que solo tenga en cuenta
        //si la variable esta contenida.
        expect(result).toContain('Daniel');
    })
})