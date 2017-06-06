(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
                                                                                                                                                                                                                                                                               * Copyright (c) 2016, Dmitry Erzunov.
                                                                                                                                                                                                                                                                               * Licensed under the MIT License.
                                                                                                                                                                                                                                                                               */

var _pluralizr = require('pluralizr');

var _pluralizr2 = _interopRequireDefault(_pluralizr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pluralLocalize = function pluralLocalize(languageCode, pluralStrings, number) {

    switch (typeof pluralStrings === 'undefined' ? 'undefined' : _typeof(pluralStrings)) {

        case 'string':
            // If no need in forms, but we want to replace "$Count" with number
            return pluralStrings.replace("$Count", number);

        case 'object':
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
            break;
        default:
            console.error("Ключ переданный в PluralLocalize не является ни строкой ни объектом. Код языка " + languageCode + ", строка из ключа: " + pluralStrings);
            return '<i18n Error: ' + languageCode + ' | ' + pluralStrings + '>';
    }
};

var translate = function translate(currentLangDictionary, languageCode, key, number) {

    if (languageCode === "keys") {
        return key; // If we want to see keys without translate
    }

    if (!currentLangDictionary) {
        console.error("i18n: localize: no dictionary");
        return "<i18n Error>";
    } else if (currentLangDictionary[key] || currentLangDictionary[key] === '') {

        if (!number && number !== 0) {
            // Just take a string from dictionary
            return currentLangDictionary[key];
        } else {
            // Use pluralize mechanics
            return pluralLocalize(languageCode, currentLangDictionary[key], number);
        }
    } else {
        console.error('i18n: No value for key ' + key + ' in dictionary', currentLangDictionary);
        return '<No ' + key + ' key for ' + languageCode + '>';
    }
};

exports.default = translate;

},{"pluralizr":1}]},{},[2]);
