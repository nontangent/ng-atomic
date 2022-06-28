import 'zone.js';
import { ElementsLoader, elementsLoaderFactory } from './elements-loader';
import { ElementsConfig } from './resolve-config';
import { MESSAGE } from './testing/example.component';

const ELEMENTS: ElementsConfig[] = [
  {
    name: '@ng-atomic/example-component',
    bootstrap: () => import('./testing/example.module').then(m => m.ExampleModule),
  },
];

describe('ElementsLoader', () => {
  let loader: ElementsLoader;

  beforeEach(() => {
    document.body.innerHTML = `<example-component></example-component>`
    loader = elementsLoaderFactory();
    loader.register(ELEMENTS);
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
