'use strict';

if (typeof window !== 'undefined') {
    document.addEventListener("DOMContentLoaded", function () {
        fetchData();
    });
} else {
    fetchData();
}

function fetchData() {
    var xhr;

    if (typeof XMLHttpRequest !== 'undefined') {
        xhr = new XMLHttpRequest();
    } else if (typeof require === 'function') {
        var fs = require('fs');
        var data = fs.readFileSync('words.txt', 'utf8');
        processFileContent(data);
        return;
    }

    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            processFileContent(xhr.responseText);
        }
    };

    xhr.open('GET', 'words.txt', true);
    xhr.send();
}

function processFileContent(data) {
    var wordsArray = data.split('\n').filter(Boolean);

    var generatedPhrase = generatePhrase(wordsArray);

    if (typeof document !== 'undefined') {
        document.getElementById('generatedPhrase').innerText = generatedPhrase;
    } else if (typeof console !== 'undefined') {
        console.log(generatedPhrase);
    }
}

function generatePhrase(wordsArray) {
    var uniqueWords = Array.from(new Set(wordsArray)); 

    var phrase = '';

    for (var i = 0; i < 10; i++) {
        var randomWord = getRandomElement(uniqueWords);

     
        uniqueWords.splice(uniqueWords.indexOf(randomWord), 1);

        var wordToAdd = i === 0 ? randomWord.charAt(0).toUpperCase() + randomWord.slice(1) : randomWord;
        

        phrase += wordToAdd;

        if (i < 9) {
            phrase += ' ';
        }
    }

    phrase += '.';

    return phrase;
}


function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
