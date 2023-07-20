import { Inject, Injectable } from '@nestjs/common';
import { TranslationKeyStore } from '@qntm-code/translation-key-store';
import { TRANSLATE_MODULE_CONFIG } from './tokens';
import { TranslateModuleConfig } from './translate-module-config.model';

@Injectable()
export class TranslateService {
  /**
   * The dictionary for the known languages
   */
  private readonly store: TranslationKeyStore;

  constructor(@Inject(TRANSLATE_MODULE_CONFIG) private readonly translateModuleConfig: TranslateModuleConfig) {
    this.store = new TranslationKeyStore({
      enableLogging: translateModuleConfig.enableMissingTranslationLogging,
      missingTranslationHandler: translateModuleConfig.missingTranslationHandler,
    });

    translateModuleConfig.languages.forEach(({ language, namespace, values }) =>
      this.store.addLanguageNamespace(language, namespace, values)
    );
  }

  public translate(language: string, key: string, params?: Record<string, unknown>): string {
    // Attempt to get the translation key value
    let result = this.store.getTranslationValue(key, language);

    // If the translation key value is not found and the language is not the same as the default language
    if (!result && language !== this.translateModuleConfig.defaultLanguage) {
      result = this.store.getTranslationValue(key, this.translateModuleConfig.defaultLanguage);
    }

    if (result) {
      return result(params);
    }

    return key;
  }
}
