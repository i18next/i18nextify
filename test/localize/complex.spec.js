import { createRunner } from '../helpers';

describe('complex nodes', () => {
  const runner = createRunner();

  const tests = [
    [
      `
      <div>
        Some more tests on attributes:
        <h4>title:</h4>
        <a
          i18next-key="test.link"
          href="/docs/ecosystem/#postprocessors"
          title="Works on title"
          >hover me</a
        >
        <h4>placeholder:</h4>
        <input type="text" placeholder="translated placeholder" />
      </div>
      `,
      `<div i18next-orgval-1="
        Some more tests on attributes:
        " i18next-orgval-3="
        " i18next-orgval-5="
        " i18next-orgval-7="
        " i18next-orgval-9="
      " localized="">
#Some more tests on attributes:#
<h4 i18next-orgval-0="title:" localized="">#title:#</h4>
<a i18next-key="test.link" i18next-orgval-0="hover me" title-i18next-orgval="Works on title" localized="" href="/docs/ecosystem/#postprocessors" title="#Works on title#">#hover me#</a>
<h4 i18next-orgval-0="placeholder:" localized="">#placeholder:#</h4>
<input placeholder-i18next-orgval="translated placeholder" localized="" type="text" placeholder="#translated placeholder#">
</div>`,
      [
        'Some more tests on attributes:',
        'title:',
        'test.link',
        'test.link.title',
        'placeholder:',
        'translated placeholder'
      ]
    ]
  ];

  tests.forEach((test) => {
    it(`correctly handles ${test[0]}`, () => {
      expect(runner.run(...test));
    });
  });
});
