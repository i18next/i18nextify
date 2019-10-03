import { createRunner } from './helpers';

describe('locize - basic node', () => {
  const runner = createRunner();

  it('should correctly extract content', () => {
    runner.run(
      '<div>test</div>',
      '<div i18next-orgval-0="test" localized="">#test#</div>',
      ['test']
    );
  });
});

describe('locize - basic node (multi)', () => {
  const runner = createRunner();

  const tests = [
    [
      '<div>test</div>',
      '<div i18next-orgval-0="test" localized="">#test#</div>',
      ['test']
    ]
  ];

  tests.forEach((test) => {
    it(`correctly handles ${test[0]}`, () => {
      expect(runner.run(...test));
    });
  });
});
