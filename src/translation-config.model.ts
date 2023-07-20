import { TranslationLanguage } from '@qntm-code/translation-key-store';

export interface TranslationConfig {
  language: string;
  namespace: string;
  values: TranslationLanguage;
}
