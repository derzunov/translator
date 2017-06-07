/*!
 * translator <https://github.com/derzunov/translator>
 *
 * Copyright (c) 2016, Dmitry Erzunov.
 * Licensed under the MIT License.
 */

import pluralize from 'pluralizr';

const getValue = function( currentLangDictionary, key ) {

      if ( key in currentLangDictionary ) {
            return currentLangDictionary[key];
      }

      let keys = key.split('.');
      let value = currentLangDictionary;

      while (keys.length > 0) {
            key = keys.shift();
            value = value[key];

            if (value == undefined) break;
      }

      return value;
};

const pluralLocalize = function( languageCode, pluralStrings, number ) {

    switch ( typeof pluralStrings ) {

        case 'string':
            // If no need in forms, but we want to replace "$Count" with number
            return pluralStrings.replace( "$Count", number );

        case 'object':
            return pluralStrings.reduce(( result, piece ) => {

                switch ( typeof piece ) {

                    case 'string':
                        let isVariable = piece.indexOf('$') === 0;
                        result += isVariable ? number : piece;
                        break;

                    case 'object':
                        if ( piece.length != null ) {
                            result += pluralize( languageCode, number, piece );
                        }
                        break;

                    default:
                        //do nothing
                }
                return result;
            }, '');
            break;
        default:
            console.error( "Ключ переданный в PluralLocalize не является ни строкой ни объектом. Код языка " + languageCode + ", строка из ключа: " + pluralStrings);
            return `<i18n Error: ${ languageCode } | ${ pluralStrings }>`;
    }
};

const translate = function( currentLangDictionary, languageCode, key, number ) {

    if ( languageCode === "keys" ) {
        return key; // If we want to see keys without translate
    }

    if ( !currentLangDictionary ) {
        console.error( "i18n: localize: no dictionary" );
        return "<i18n Error>";
    }

    let value = getValue( currentLangDictionary, key );

    if ( value ) {

        if ( !number && number !== 0 ) {
            // Just take a string from dictionary
            return value;
        } else {
            // Use pluralize mechanics
            return pluralLocalize(languageCode, value, number);
        }

    } else {
        console.error( `i18n: No value for key ${ key } in dictionary`, currentLangDictionary );
        return `<No ${ key } key for ${ languageCode }>`;
    }
};

export default translate;
