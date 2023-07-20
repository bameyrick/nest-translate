import { LanguageConfig } from './language-config.model';

export interface TranslateModuleConfig {
  defaultLanguage: string;
  languages: LanguageConfig[];
  enableMissingTranslationLogging?: boolean;
  missingTranslationHandler?: (language: string, key: string) => void;
}
