import { DefaultPipe } from './default.pipe';
import { transformAll } from '@angular/compiler/src/render3/r3_ast';

describe('Pipe: Default', () => {

  let pipe: DefaultPipe;

  beforeEach(() => {
    pipe = new DefaultPipe();
  });

  afterEach(() => {
    pipe = null;
  })

  it('providing no value returns fallback', () => {
    let result: string = pipe.transform('', "debe ser fallback");
    expect(result).toBe("debe ser fallback");
  });

  it('providing value returns the value, if http on it will be set as https', () => {
    let result: string = pipe.transform('http://www.univalle.edu.co/', 'algo', true);
    expect(result).toBe('https://www.univalle.edu.co/')
  });
});
