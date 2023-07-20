import { TranslateService } from './translate.service';

describe(`TranslateService`, () => {
  it(`Should return a translated string`, () => {
    const translateService = new TranslateService({
      defaultLanguage: 'en',
      translations: [
        {
          language: 'en',
          namespace: 'test',
          values: {
            hello: 'Hello',
          },
        },
      ],
    });

    expect(translateService.translate('en', 'test.hello')).toBe('Hello');
  });

  it(`Should log an error if a translated string cannot be found`, () => {
    const translateService = new TranslateService({
      defaultLanguage: 'en',
      translations: [
        {
          language: 'en',
          namespace: 'test',
          values: {
            hello: 'Hello',
          },
        },
      ],
      enableMissingTranslationLogging: true,
    });

    const consoleError = console.error;

    console.error = jest.fn();

    expect(translateService.translate('en', 'test.goodbye')).toBe('test.goodbye');

    expect(console.error).toHaveBeenCalledWith(`Missing translation for key "test.goodbye" in language "en"`);

    console.error = consoleError;
  });

  it(`Should utilise a custom missing translation handler`, () => {
    let handlerCalled = false;

    const translateService = new TranslateService({
      defaultLanguage: 'en',
      translations: [
        {
          language: 'en',
          namespace: 'test',
          values: {
            hello: 'Hello',
          },
        },
      ],
      missingTranslationHandler: () => {
        handlerCalled = true;
      },
    });

    expect(handlerCalled).toBe(false);

    translateService.translate('en', 'test.goodbye');

    expect(handlerCalled).toBe(true);
  });

  it(`Should attempt to find a translation in the default language if the translation is not found in the requested language`, () => {
    const translateService = new TranslateService({
      defaultLanguage: 'en',
      translations: [
        {
          language: 'en',
          namespace: 'test',
          values: {
            hello: 'Hello',
          },
        },
        {
          language: 'fr',
          namespace: 'test',
          values: {},
        },
      ],
    });

    expect(translateService.translate('fr', 'test.hello')).toBe('Hello');
  });
});
