import { createRunner } from '../helpers';

describe('basic nodes', () => {
  const runner = createRunner();

  const tests = [
    [
      '<div>test</div>',
      '<div i18next-orgval-0="test" localized="">#test#</div>',
      ['test']
    ],
    [
      '<h1>Test on text node 2</h1>',
      '<h1 i18next-orgval-0="Test on text node 2" localized="">#Test on text node 2#</h1>',
      ['Test on text node 2']
    ]
  ];

  tests.forEach((test) => {
    it(`correctly handles ${test[0]}`, () => {
      expect(runner.run(...test));
    });
  });
});
