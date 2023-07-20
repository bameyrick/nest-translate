import { Inject, Injectable } from '@nestjs/common';
import { TranslationKeyStore } from '@qntm-code/translation-key-store';
import { LanguageConfig } from './language-config.model';
import { DEFAULT_LANGUAGE_TOKEN, ENABLE_MISSING_TRANSLATION_LOGGING, LANGUAGES, MISSING_TRANSLATION_HANDLER } from './tokens';

@Injectable()
export class NestTranslateService {
  /**
   * The dictionary for the known languages
   */
  private readonly store: TranslationKeyStore;

  constructor(
    @Inject(DEFAULT_LANGUAGE_TOKEN) private readonly defaultLanguage = 'en',
    @Inject(LANGUAGES) readonly languages: LanguageConfig[],
    @Inject(ENABLE_MISSING_TRANSLATION_LOGGING) readonly enableMissingTranslationLogging = false,
    @Inject(MISSING_TRANSLATION_HANDLER)
    readonly missingTranslationHandler: ((language: string, key: string) => void) | undefined = undefined
  ) {
    this.store = new TranslationKeyStore({ enableLogging: enableMissingTranslationLogging, missingTranslationHandler });

    languages.forEach(({ language, namespace, values }) => this.store.addLanguageNamespace(language, namespace, values));
  }

  public translate(language: string, key: string, params?: Record<string, unknown>): string {
    // Attempt to get the translation key value
    let result = this.store.getTranslationValue(key, language);

    // If the translation key value is not found and the language is not the same as the default language
    if (!result && language !== this.defaultLanguage) {
      result = this.store.getTranslationValue(key, this.defaultLanguage);
    }

    if (result) {
      return result(params);
    }

    return key;
  }
}
