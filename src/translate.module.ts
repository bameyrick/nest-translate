import { DynamicModule, Global, Module } from '@nestjs/common';
import { TRANSLATE_MODULE_CONFIG } from './tokens';
import { TranslateModuleConfig } from './translate-module-config.model';
import { TranslateService } from './translate.service';

@Global()
@Module({
  providers: [TranslateService],
  exports: [TranslateService],
})
export class TranslateModule {
  public static forRoot(options?: TranslateModuleConfig): DynamicModule {
    return {
      module: TranslateModule,
      providers: [
        {
          provide: TRANSLATE_MODULE_CONFIG,
          useValue: options,
        },
      ],
    };
  }
}
