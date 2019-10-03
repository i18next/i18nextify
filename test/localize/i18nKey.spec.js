import { createRunner } from '../helpers';

describe('i18n-key', () => {
  const runner = createRunner();

  const tests = [
    [
      '<div i18next-key="key1">test</div>',
      '<div i18next-key="key1" i18next-orgval-0="test" localized="">#test#</div>',
      [{ k: 'key1', v: 'test' }]
    ],
    [
      '<h1 i18next-key="key.2">Test on text node 2</h1>',
      '<h1 i18next-key="key.2" i18next-orgval-0="Test on text node 2" localized="">#Test on text node 2#</h1>',
      [{ k: 'key.2', v: 'Test on text node 2' }]
    ]
  ];

  tests.forEach((test) => {
    it(`correctly handles ${test[0]}`, () => {
      expect(runner.run(...test));
    });
  });
});
