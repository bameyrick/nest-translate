import { MissingTranslationHandlerFn } from '@qntm-code/translation-key-store';
import { TranslationConfig } from './translation-config.model';

export interface TranslateModuleConfig {
  defaultLanguage: string;
  translations: TranslationConfig[];
  enableMissingTranslationLogging?: boolean;
  missingTranslationHandler?: MissingTranslationHandlerFn;
}
