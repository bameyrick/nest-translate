import { TranslationConfig } from './translation-config.model';

export interface TranslateModuleConfig {
  defaultLanguage: string;
  translations: TranslationConfig[];
  enableMissingTranslationLogging?: boolean;
  missingTranslationHandler?: (language: string, key: string) => void;
}
