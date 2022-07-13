import 'zone.js';
import { BaseElementsLoader } from './elements-loader';
import { MESSAGE, ExampleModule } from './testing';

class ElementsLoader extends BaseElementsLoader {
  import() {
    return Promise.resolve(ExampleModule);
  }
}

describe('ElementsLoader', () => {
  let loader: ElementsLoader;

  beforeEach(() => {
    document.body.innerHTML = `<example-component></example-component>`
    loader = new ElementsLoader();
  });

  describe('load()', () => {
    it('should be succeeded!', async () => {
      const providers = [{ provide: MESSAGE, useValue: 'injected!' }];
      await loader.load('@ng-atomic/example-component', providers);
      expect(customElements.get('example-component')).toBeTruthy();
      expect(document.body.innerHTML).toContain('injected!');
    });
  });

});
