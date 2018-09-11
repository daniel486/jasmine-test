import {getCurrencies} from './getCurrencies';

describe('getCurrencies', () => {
    it('should return the supported currencies', () => {
        const result = getCurrencies();
        expect(result).toContain('AUD');
        expect(result).toContain('EUR');
        expect(result).toContain('USD');
        expect(result).toContain('COP');
    })
})