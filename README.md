# translator

##Using NPM

**Console**

```javascript
npm i --save translatr
```
**In your code**
```javascript
import translate from 'translatr'

var dictionary = {
  key_1: "Первый текст",
  key_2: [ "$count", " ", [ "кошка", "кошки", "кошек" ] ]
}

var string_1 = translate( dictionary, 'ru-RU', 'key_1' ); // Первый текст
var string_2 = translate( dictionary, 'ru-RU', 'key_2', 1 ); // 1 кошка
var string_3 = translate( dictionary, 'ru-RU', 'key_2', 3 ); // 2 кошки
var string_4 = translate( dictionary, 'ru-RU', 'key_2', 7 ); // 7 кошек
```
##Using compiled (example)

in progress...

