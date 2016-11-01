// Also you can open ../index.html in browser

var dictionary_1 = {
    key_0: "",
    key_1: "Первое словочочетание",
    key_2: "Число после двоеточия: $Count",
    key_3: [ [ "Пришла", "Пришли", "Пришло" ], " ", "$count", " ", [ "кошка", "кошки", "кошек" ] ]
};


var dictionary_2 = {
    key_0: "",
    key_1: "First text",
    key_2: "The number after: $Count",
    key_3: [ [ "There is only", "There are" ], " ", "$count", " ", [ "cat", "cats" ] ]
};

function renderRu() {
    var num = parseInt(document.getElementById('ru-number').value),
        text_1 = translate( dictionary_1, 'ru-RU', 'key_1' ),
        text_2 = translate( dictionary_1, 'ru-RU', 'key_2', num ),
        text_3 = translate( dictionary_1, 'ru-RU', 'key_3', num );

    document.getElementById('ru-key-1-value').innerHTML = text_1;
    document.getElementById('ru-key-2-value').innerHTML = text_2;
    document.getElementById('ru-key-3-value').innerHTML = text_3;
}

function renderEn() {
    var num = parseInt(document.getElementById('en-number').value),
        text_1 = translate( dictionary_2, 'en-US', 'key_1' ),
        text_2 = translate( dictionary_2, 'en-US', 'key_2', num ),
        text_3 = translate( dictionary_2, 'en-US', 'key_3', num );

    document.getElementById('en-key-1-value').innerHTML = text_1;
    document.getElementById('en-key-2-value').innerHTML = text_2;
    document.getElementById('en-key-3-value').innerHTML = text_3;
}

document.getElementById('ru-change').onclick = renderRu;
document.getElementById('en-change').onclick = renderEn;

renderRu();
renderEn();