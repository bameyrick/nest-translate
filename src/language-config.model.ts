import { TranslationLanguage } from '@qntm-code/translation-key-store';

export interface LanguageConfig {
  language: string;
  namespace: string;
  values: TranslationLanguage;
}
