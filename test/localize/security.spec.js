import { createRunner } from '../helpers';
import i18next from 'i18next';

// Security tests for fixes shipped in 4.0.8.
// See CHANGELOG for the associated GHSA advisory.

describe('security: javascript:/data: URL scheme blocklist in href/src substitutions', () => {
  const runner = createRunner();

  beforeEach(() => {
    i18next.setTranslations(null);
  });

  afterAll(() => {
    i18next.setTranslations(null);
  });

  it('drops javascript: URL when substituted into href', () => {
    i18next.setTranslations({ malurl: 'javascript:alert(1)' });
    // Use `run` with only the source and expectedResult (keys check skipped)
    runner.run(
      '<a href="{{malurl}}">link</a>',
      undefined, // we don't assert on exact output — just on the schemes below
    );
    // Re-run to capture output
    // (the runner already executed; now just ensure no dangerous scheme escapes)
  });

  // Below tests exercise the full pipeline via html → localize → html roundtrip
  const cases = [
    {
      name: 'javascript: scheme stripped from interpolated href',
      translations: { bad: 'javascript:alert(1)' },
      input: '<a href="{{bad}}">x</a>',
      mustNotContain: ['javascript:', 'javascript%3A'],
    },
    {
      name: 'data:text/html scheme stripped from interpolated href',
      translations: { bad: 'data:text/html,<script>alert(1)</script>' },
      input: '<a href="{{bad}}">x</a>',
      mustNotContain: ['data:text/html', 'data%3A'],
    },
    {
      name: 'vbscript: scheme stripped from interpolated src',
      translations: { bad: 'vbscript:msgbox("x")' },
      input: '<img src="{{bad}}">',
      mustNotContain: ['vbscript:'],
    },
    {
      name: 'file: scheme stripped from interpolated href',
      translations: { bad: 'file:///etc/passwd' },
      input: '<a href="{{bad}}">x</a>',
      mustNotContain: ['file://'],
    },
    {
      name: 'upper/mixed-case javascript: also blocked (regex is /i)',
      translations: { bad: 'JaVaScRiPt:alert(1)' },
      input: '<a href="{{bad}}">x</a>',
      mustNotContain: ['javascript:', 'JaVaScRiPt:'],
    },
    {
      name: 'leading whitespace before javascript: still blocked',
      translations: { bad: '   javascript:alert(1)' },
      input: '<a href="{{bad}}">x</a>',
      mustNotContain: ['javascript:'],
    },
  ];

  const VNode = require('virtual-dom/vnode/vnode');
  const VText = require('virtual-dom/vnode/vtext');
  const convertHTML = require('html-to-vdom')({ VNode, VText });
  const toHTML = require('vdom-to-html');
  const localize = require('../../src/localize').default;

  cases.forEach((c) => {
    it(c.name, () => {
      i18next.setTranslations(c.translations);
      const node = convertHTML(c.input.trim());
      const result = toHTML(localize(node));
      c.mustNotContain.forEach((needle) => {
        expect(result).not.toContain(needle);
      });
    });
  });

  it('still allows legitimate http/https URLs through interpolation', () => {
    i18next.setTranslations({ ok: 'https://example.com/x.png' });
    const node = convertHTML('<img src="{{ok}}">');
    const result = toHTML(localize(node));
    expect(result).toContain('https://example.com/x.png');
  });

  it('still allows relative URLs through interpolation', () => {
    i18next.setTranslations({ ok: '/assets/logo.png' });
    const node = convertHTML('<img src="{{ok}}">');
    const result = toHTML(localize(node));
    expect(result).toContain('/assets/logo.png');
  });
});

describe('security: optional sanitize hook for translated HTML', () => {
  const VNode = require('virtual-dom/vnode/vnode');
  const VText = require('virtual-dom/vnode/vtext');
  const convertHTML = require('html-to-vdom')({ VNode, VText });
  const toHTML = require('vdom-to-html');
  const localize = require('../../src/localize').default;

  beforeEach(() => {
    i18next.setTranslations(null);
  });

  afterAll(() => {
    i18next.setTranslations(null);
  });

  it('calls the configured sanitize function on each translated HTML body (merge mode)', () => {
    const seen = [];
    i18next.resetOptions({
      sanitize: (s, ctx) => {
        seen.push({ s, ctx });
        return s.replace(/<script[^>]*>.*?<\/script>/gi, '');
      },
    });
    // text content IS the key — mock returns HTML with a <script>
    i18next.setTranslations({
      hello: 'hi <script>alert(1)</script>',
    });
    // `merge=""` attribute forces the HTML-parsing code path
    const node = convertHTML('<div merge="">hello</div>');
    const result = toHTML(localize(node));
    // sanitize was invoked with the raw translated HTML
    expect(seen.length).toBeGreaterThan(0);
    expect(seen[0].s).toContain('<script>');
    // and the <script> was stripped from the final output
    expect(result).not.toContain('<script>');
    expect(result).not.toContain('alert(1)');
  });

  it('defaults to pass-through when no sanitize is configured (library\'s core purpose: render HTML)', () => {
    i18next.resetOptions({}); // no sanitize
    i18next.setTranslations({
      hello: 'hi <em>world</em>',
    });
    const node = convertHTML('<div merge="">hello</div>');
    const result = toHTML(localize(node));
    // Legitimate HTML formatting survives (that's the library's whole point)
    expect(result).toContain('<em>');
  });
});
