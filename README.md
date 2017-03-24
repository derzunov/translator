# translator
[![Build Status](https://travis-ci.org/derzunov/translator.svg?branch=master)](https://travis-ci.org/derzunov/translator)
[![npm](https://img.shields.io/npm/dt/translatr.svg)](https://www.npmjs.com/package/translatr)
[![npm](https://img.shields.io/npm/v/translatr.svg)](https://www.npmjs.com/package/translatr)


### Supported languages list with expected codes for pluralize mechanics switching:

- Russian ( ru, ru-RU )
- English ( en, en-US, en-UK )
- French ( fr )
- German ( de )
- Polish ( pl )
- Czech ( cs )
- Portuguese ( pt )
- Brazilian Portuguese ( pt-BR, br )
- Arabic ( ar-AR, ar )
- Turkish ( tr )
- Occitan ( oc )
- Belarusian ( be )
- Bosnian ( bs )
- Croatian ( hr )
- Serbian ( sr )
- Ukrainian ( uk )
- ...

## Using NPM

**Console**

```javascript
npm i --save translatr
```
**In your code**

### Russian
```javascript
import translate from 'translatr'

var dictionary = {
  key_1: "Первый текст",
  key_2: [ "$count", " ", [ "кошка", "кошки", "кошек" ] ]
}

var string_1 = translate( dictionary, 'ru', 'key_1' ); // Первый текст
var string_2 = translate( dictionary, 'ru', 'key_2', 1 ); // 1 кошка
var string_3 = translate( dictionary, 'ru', 'key_2', 3 ); // 2 кошки
var string_4 = translate( dictionary, 'ru', 'key_2', 7 ); // 7 кошек
```

### Polish

```javascript
import translate from 'translatr'

var dictionary = {
  key_1: "Prosze, dwa bilety drugiej klasy do Warszawy.",
  key_2: [ "$count", " ", [ "godzina", "godziny", "godzin" ] ]
}

var string_1 = translate( dictionary, 'pl', 'key_1' ); // Prosze, dwa bilety drugiej klasy do Warszawy.
var string_2 = translate( dictionary, 'pl', 'key_2', 1 ); // 1 godzina
var string_3 = translate( dictionary, 'pl', 'key_2', 3 ); // 3 godziny
var string_4 = translate( dictionary, 'pl', 'key_2', 31 ); // 31 godzin
```

### English

```javascript
import translate from 'translatr'

var dictionary = {
  key_1: "First text",
  key_2: [ "$count", " ", [ "hour", "hours"] ]
}

var string_1 = translate( dictionary, 'en', 'key_1' ); // First text
var string_2 = translate( dictionary, 'en', 'key_2', 0 ); // 0 hours
var string_3 = translate( dictionary, 'en', 'key_2', 1 ); // 1 hours
var string_4 = translate( dictionary, 'en', 'key_2', 7 ); // 7 hours
```

### French

```javascript
import translate from 'translatr'

var dictionary = {
  key_1: "Ayant risqué une fois-on peut rester heureux toute la vie",
  key_2: [ "$count", " ", [ "heure", "heures"] ]
}

var string_1 = translate( dictionary, 'fr', 'key_1' ); // Ayant risqué une fois-on peut rester heureux toute la vie
var string_2 = translate( dictionary, 'fr', 'key_2', 0 ); // 0 heure
var string_3 = translate( dictionary, 'fr', 'key_2', 1 ); // 1 heure
var string_4 = translate( dictionary, 'fr', 'key_2', 7 ); // 7 heures
```

## React/Redux i18n solution

[redux-react-i18n](https://github.com/derzunov/redux-react-i18n)

[demo of redux-react-i18n](https://derzunov.github.io/redux-react-i18n/)

