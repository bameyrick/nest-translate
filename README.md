#  @qntm-code/nest-translate

Simple translation module for [NestJS](https://nestjs.com/).

[![GitHub release](https://img.shields.io/github/release/bameyrick/nest-translate.svg)](https://github.com/bameyrick/nest-translate/releases)
[![Tests](https://github.com/bameyrick/nest-translate/actions/workflows/tests.yml/badge.svg)](https://github.com/bameyrick/nest-translate/actions/workflows/tests.yml)
[![codecov](https://codecov.io/gh/bameyrick/nest-translate/branch/main/graph/badge.svg)](https://codecov.io/gh/bameyrick/nest-translate)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=bameyrick_nest-translate&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=bameyrick_nest-translate)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=bameyrick_nest-translate&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=bameyrick_nest-translate)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=bameyrick_nest-translate&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=bameyrick_nest-translate)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=bameyrick_nest-translate&metric=bugs)](https://sonarcloud.io/summary/new_code?id=bameyrick_nest-translate)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=bameyrick_nest-translate&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=bameyrick_nest-translate)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=bameyrick_nest-translate&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=bameyrick_nest-translate)

## Installation

```bash
npm i @qntm-code/nest-translate
```

or

```bash
yarn add @qntm-code/nest-translate
```

## Usage

Import the `TranslateModule` into your root module. The `TranslateModule` requires a configuration object with the default language and a list of namespaces with the translations for each language.

```typescript
import { Module } from '@nestjs/common';
import { TranslateModule } from '@qntm-code/nest-translate';

@Module({
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      translations: [
        {
          language: 'en',
          namespace: 'greetings',
          values: {
            hello: 'Hello',
            world: 'World',
            personal: {
              hello_name: 'Hello {name}',
              goodbye_name: 'Goodbye {name}',
            },
          },
        },
        {
          language: 'de',
          namespace: 'greetings',
          values: {
            hello: 'Hallo',
            world: 'Welt',
            personal: {
              hello_name: 'Hallo {name}',
            },
          },
        },
      ],
    }),
  ],
})
export class AppModule {}
```

In this example we are providing the values as a JavaScript object, but it is also possible to load the values from a JSON file.

```typescript
import { Module } from '@nestjs/common';
import { TranslateModule } from '@qntm-code/nest-translate';

import enGreetings from './greetings.en.json';
import deGreetings from './greetings.de.json';

@Module({
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      translations: [
        {
          language: 'en',
          namespace: 'greetings',
          values: enGreetings,
        },
        {
          language: 'de',
          namespace: 'greetings',
          values: deGreetings,
        },
      ],
    }),
  ],
})
```

Inject the `TranslateService` into your controller or service:

```typescript
import { Injectable } from '@nestjs/common';
import { TranslateService } from '@qntm-code/nest-translate';

@Injectable()
export class AppService {
  constructor(private readonly translateService: TranslateService) {}

  public getHelloWorld(language: string): string {
    const hello = this.translateService.translate(language, 'greetings.hello');

    const world = this.translateService.translate(language, 'greetings.world');

    return `${hello} ${world}`;
  }
}
```

The translate module uses [messageformat](https://messageformat.github.io/) to format the translated strings. You can pass additional parameters to the `translate` method:

```typescript
const hello = this.translateService.translate('en', 'greetings.personal.hello_name', { name: 'John' });
// 'Hello Jon'
```

If a translation is not found in the provided language, the default language is used. If the translation is not found in the default language, the key is returned.

```typescript
const hello = this.translateService.translate('de', 'greetings.personal.goodbye_name', { name: 'John' });
// 'Goodbye Jon'

const goodMorning = this.translateService.translate('de', 'greetings.good_morning');
// 'greetings.good_morning'
```
