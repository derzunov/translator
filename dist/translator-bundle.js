(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*!
 * pluralizer <https://github.com/derzunov/pluralizer>
 *
 * Copyright (c) 2016, Dmitry Erzunov.
 * Licensed under the MIT License.
 */

'use strict';

var pluralFormTwoFormsDefault = function( number, titles ) {
    var plural = number !== 1 ? 1 : 0;
    return titles[plural]
};

var pluralFormTwoFormsSecond = function( number, titles ) {
    var plural = number > 1 ? 1 : 0;
    return titles[plural]
};

var pluralFormThreeFormsDefault = function( number, titles ) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
};

var pluralFormSixFormsDefault = function( number, titles ) {
    var plural = number === 0 ? 0 : number === 1 ? 1 : number === 2 ? 2 : number % 100 >= 3 && number % 100 <= 10 ? 3 : number % 100 >= 11 ? 4 : 5;
    return titles[plural];
};

var pluralFormCs = function( number, titles ) {
    var plural = number === 1 ? 0 : number >= 2 && number <= 4 ? 1 : 2;
    return titles[ plural ];
};

var pluralFormPl = function( number, titles ) {
    var plural = number === 1 ? 0 : number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20) ? 1 : 2;
    return titles[plural];
};
// Just for uniformity
var pluralFormOneForm = function( number, titles ) {
    var plural = 0;
    return titles[plural];
};

var pluralize = function( languageCode, number, titles ) {
    switch( languageCode ) {
        case 'ar-AR':
        case 'ar':
            return pluralFormSixFormsDefault( number, titles );
            break;

        case 'cs':
            return pluralFormCs( number, titles );
            break;

        case 'pl':
            return pluralFormPl( number, titles );
            break;

        case 'en-UK':
        case 'en-US':
        case 'en':
        case 'de-DE':
        case 'pt':
        case 'de':
            return pluralFormTwoFormsDefault( number, titles );
            break;

        case 'fr-FR':
        case 'fr':
        case 'pt-BR':
        case 'br':
        case 'oc':
        case 'tr':
            return pluralFormTwoFormsSecond( number, titles );
            break;

        case 'ru-RU':
        case 'ru':
        case 'be':
        case 'bs':
        case 'hr':
        case 'sr':
        case 'uk':
            // Default ru-RU for example - 1 штука, 3 штуки, 5 штук
            return pluralFormThreeFormsDefault( number, titles );
            break;

        default:
            return pluralFormOneForm( number, titles );

    }
};

module.exports = pluralize;

},{}],2:[function(require,module,exports){
'use strict';

var _translator = require('./translator');

var _translator2 = _interopRequireDefault(_translator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.translate = _translator2.default;

},{"./translator":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*!
                                                                                                                                                                                                                                                                               * translator <https://github.com/derzunov/translator>
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * Copyright (c) 2018, Dmitry Erzunov.
                                                                                                                                                                                                                                                                               * Licensed under the MIT License.
                                                                                                                                                                                                                                                                               */

var _pluralizr = require('pluralizr');

var _pluralizr2 = _interopRequireDefault(_pluralizr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ERROR_STRING = '!!! i18n Error !!!';

var getValue = function getValue(currentLangDictionary, key) {

    if (key in currentLangDictionary) {
        return currentLangDictionary[key];
    }

    var keys = key.split('.');
    var value = currentLangDictionary;

    while (keys.length > 0) {
        key = keys.shift();
        value = value[key];

        if (value === undefined) break;
    }

    return value;
};

var pluralLocalize = function pluralLocalize(languageCode, pluralStrings, numbers) {

    var number = numbers[0];

    switch (typeof pluralStrings === 'undefined' ? 'undefined' : _typeof(pluralStrings)) {

        case 'string':
            var match = pluralStrings.match(/\[(.*?\])\s*\]/g);
            if (match) {
                match.forEach(function (matchData) {
                    var pluralMatch = matchData.match(/\[.*(\[(.*?)\])\s*\]/);
                    var pluralObject = pluralMatch[2].split(',').map(function (text) {
                        return text.replace(/\'|\"|\s+/g, '');
                    });
                    var pluralArray = pluralMatch[0].split(',');
                    var count = pluralArray[0].replace(/\[|\s+|\"|\'/g, '');
                    var separator = pluralArray[1].match(/\'([^\']*)\'|\"([^\"]*)/)[2];
                    pluralStrings = pluralStrings.replace(matchData, pluralLocalize(languageCode, [count, separator, pluralObject], [numbers.shift()]));
                });
            }

            // If no need in forms, but we want to replace "$Count" with number
            return pluralStrings.replace('$Count', number);

        case 'object':

            if (typeof pluralStrings.reduce !== 'function') {
                console.error('i18n: the value of the key is an object. Expected values: string or array');
                return ERROR_STRING;
            }

            return pluralStrings.reduce(function (result, piece) {

                switch (typeof piece === 'undefined' ? 'undefined' : _typeof(piece)) {

                    case 'string':
                        var isVariable = piece.indexOf('$') === 0;
                        result += isVariable ? number : piece;
                        break;

                    case 'object':
                        if (piece.length != null) {
                            result += (0, _pluralizr2.default)(languageCode, number, piece);
                        }
                        break;

                    default:
                    //do nothing
                }
                return result;
            }, '');

        default:
            console.error('i18n: The key passed into PluralLocalize is not a string or array. Language code ' + languageCode + ', value of key: ' + pluralStrings);
            return ERROR_STRING;
    }
};

var translate = function translate(currentLangDictionary, languageCode, key) {

    if (languageCode === 'keys') {
        return key; // If we want to see keys without translate
    }

    if (!currentLangDictionary) {
        console.error('i18n: translate: no dictionary');
        return ERROR_STRING;
    }

    var value = getValue(currentLangDictionary, key);

    if (value) {
        for (var _len = arguments.length, numbers = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
            numbers[_key - 3] = arguments[_key];
        }

        if (numbers && numbers.length > 0) {
            // Use pluralize mechanics
            return pluralLocalize(languageCode, value, numbers);
        } else {
            // Just take a string from dictionary
            return value;
        }
    } else {
        console.error('i18n: No value for key ' + key + ' in dictionary', currentLangDictionary);
        return ERROR_STRING;
    }
};

exports.default = translate;

},{"pluralizr":1}]},{},[2]);
