// You can open ../index.html in browser

// translator-bundle exports this function to window
var translate = window.translate

var dictionary_1 = {
    key_0: '',
    key_1: 'Первое словочочетание',
    key_2: 'Число после двоеточия: $Count',
    key_3: [ [ 'Пришла', 'Пришли', 'Пришло' ], ' ', '$count', ' ', [ 'кошка', 'кошки', 'кошек' ] ],
    key_4: {
        val_1: 'Белый котёнок',
        val_2: 'Чёрный котенок',
        val_3: [ [ 'Пришёл', 'Пришли', 'Пришло' ], ' ', '$count', ' ', [ 'котёнок', 'котёнка', 'котят' ] ],
    }
}


var dictionary_2 = {
    key_0: '',
    key_1: 'First text',
    key_2: 'The number after: $Count',
    key_3: [ [ 'There is only', 'There are' ], ' ', '$count', ' ', [ 'cat', 'cats' ] ],
    key_4: {
        val_1: 'White kitten',
        val_2: 'Black kitten',
        val_3: [ [ 'There is only', 'There are' ], ' ', '$count', ' ', [ 'kitten', 'kittens' ] ],
    }
}

function renderRu() {
    var num = parseInt( document.getElementById( 'ru-number' ).value ),
        text_1 = translate( dictionary_1, 'ru-RU', 'key_1' ),
        text_2 = translate( dictionary_1, 'ru-RU', 'key_2', num ),
        text_3 = translate( dictionary_1, 'ru-RU', 'key_3', num ),
        text_4_1 = translate( dictionary_1, 'ru-RU', 'key_4.val_1' ),
        text_4_2 = translate( dictionary_1, 'ru-RU', 'key_4.val_2' ),
        text_4_3 = translate( dictionary_1, 'ru-RU', 'key_4.val_3', num )

    document.getElementById( 'ru-key-1-value' ).innerHTML = text_1
    document.getElementById( 'ru-key-2-value' ).innerHTML = text_2
    document.getElementById( 'ru-key-3-value' ).innerHTML = text_3

    document.getElementById( 'ru-key-4-1-value' ).innerHTML = text_4_1
    document.getElementById( 'ru-key-4-2-value' ).innerHTML = text_4_2
    document.getElementById( 'ru-key-4-3-value' ).innerHTML = text_4_3
}

function renderEn() {
    var num = parseInt( document.getElementById( 'en-number' ).value ),
        text_1 = translate( dictionary_2, 'en-US', 'key_1' ),
        text_2 = translate( dictionary_2, 'en-US', 'key_2', num ),
        text_3 = translate( dictionary_2, 'en-US', 'key_4.val_2', num ),
        text_4_1 = translate( dictionary_2, 'en-US', 'key_4.val_1' ),
        text_4_2 = translate( dictionary_2, 'en-US', 'key_4.val_2' ),
        text_4_3 = translate( dictionary_2, 'en-US', 'key_4.val_3', num )

    document.getElementById( 'en-key-1-value' ).innerHTML = text_1
    document.getElementById( 'en-key-2-value' ).innerHTML = text_2
    document.getElementById( 'en-key-3-value' ).innerHTML = text_3

    document.getElementById( 'en-key-4-1-value' ).innerHTML = text_4_1
    document.getElementById( 'en-key-4-2-value' ).innerHTML = text_4_2
    document.getElementById( 'en-key-4-3-value' ).innerHTML = text_4_3
}

document.getElementById( 'ru-change' ).onclick = renderRu
document.getElementById( 'en-change' ).onclick = renderEn

renderRu()
renderEn()
