/*!
 * translator <https://github.com/derzunov/translator>
 *
 * Copyright (c) 2016, Dmitry Erzunov.
 * Licensed under the MIT License.
 */

import pluralize from 'pluralizr';
import _ from 'underscore';

const pluralLocalize = function( languageCode, pluralStrings, number ) {

    switch ( typeof pluralStrings ) {

        case 'string':
            // If no need in forms, but we want to replace "$Count" with number
            return pluralStrings.replace( "$Count", number );

        case 'object':
            return _.reduce( pluralStrings, ( result, piece ) => {

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
    } else if ( currentLangDictionary[key] || currentLangDictionary[key] === '' ) {

        if ( !number && number !== 0 ) {
            // Just take a string from dictionary
            return currentLangDictionary[key];
        } else {
            // Use pluralize mechanics
            return pluralLocalize(languageCode, currentLangDictionary[key], number);
        }

    } else {
        console.error( `i18n: No value for key ${ key } in dictionary`, currentLangDictionary );
        return `<No ${ key } key for ${ languageCode }>`;
    }
};

export default translate;
