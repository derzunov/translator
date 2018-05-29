/*!
 * translator <https://github.com/derzunov/translator>
 *
 * Copyright (c) 2018, Dmitry Erzunov.
 * Licensed under the MIT License.
 */

import pluralize from 'pluralizr'

const ERROR_STRING = '!!! i18n Error !!!'

const getValue = function( currentLangDictionary, key ) {

    if ( key in currentLangDictionary ) {
        return currentLangDictionary[ key ]
    }

    let keys = key.split( '.' )
    let value = currentLangDictionary

    while ( keys.length > 0 ) {
        key = keys.shift()
        value = value[ key ]

        if ( value === undefined ) break
    }

    return value
}

const pluralLocalize = function( languageCode, pluralStrings, numbers ) {

    let number = numbers[ 0 ]

    switch ( typeof pluralStrings ) {

        case 'string':
            let match = pluralStrings.match( /\[(.*?\])\s*\]/g )
            if ( match ) {
                match.forEach( ( matchData ) => {
                    let pluralMatch = matchData.match( /\[.*(\[(.*?)\])\s*\]/ )
                    let pluralObject = pluralMatch[ 2 ].split( ',' ).map( ( text ) => { return text.replace( /\'|\"|\s+/g, '' ) } )
                    let pluralArray = pluralMatch[ 0 ].split( ',' )
                    let count = pluralArray[ 0 ].replace( /\[|\s+|\"|\'/g, '' )
                    let separator = pluralArray[ 1 ].match( /\'([^\']*)\'|\"([^\"]*)/ )[ 2 ]
                    pluralStrings = pluralStrings.replace( matchData, pluralLocalize( languageCode, [ count, separator, pluralObject ], [ numbers.shift() ] ) )
                } )
            }

            // If no need in forms, but we want to replace "$Count" with number
            return pluralStrings.replace( '$Count', number )

        case 'object':

            if ( typeof pluralStrings.reduce !== 'function' ) {
                console.error( 'i18n: the value of the key is an object. Expected values: string or array' )
                return ERROR_STRING
            }

            return pluralStrings.reduce( ( result, piece ) => {

                switch ( typeof piece ) {

                    case 'string':
                        let isVariable = piece.indexOf( '$' ) === 0
                        result += isVariable ? number : piece
                        break

                    case 'object':
                        if ( piece.length != null ) {
                            result += pluralize( languageCode, number, piece )
                        }
                        break

                    default:
                        //do nothing
                }
                return result
            }, '' )

        default:
            console.error( 'i18n: The key passed into PluralLocalize is not a string or array. Language code ' + languageCode + ', value of key: ' + pluralStrings )
            return ERROR_STRING
    }
}

const translate = function( currentLangDictionary, languageCode, key, ...numbers ) {

    if ( languageCode === 'keys' ) {
        return key // If we want to see keys without translate
    }

    if ( !currentLangDictionary ) {
        console.error( 'i18n: translate: no dictionary' )
        return ERROR_STRING
    }

    let value = getValue( currentLangDictionary, key )

    if ( value ) {

        if ( numbers && numbers.length > 0 ) {
            // Use pluralize mechanics
            return pluralLocalize( languageCode, value, numbers )
        } else {
            // Just take a string from dictionary
            return value
        }

    } else {
        console.error( `i18n: No value for key ${ key } in dictionary`, currentLangDictionary )
        return ERROR_STRING
    }
}

export default translate
