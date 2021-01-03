import { PopupWindow } from './Overlay.mjs';
import { TextAnalyzer } from './TextAnalyzer.mjs';

export { ENV, App };

const ENV = {
    "editor": document.getElementById("editor"),
    "searchField": document.getElementById("searchField"),
    "searchButton": document.getElementById("searchButton"),
    "clearSearchFieldButton": document.getElementById("clearSearchFieldButton"),
    "occurrencesCounter": document.getElementById("occurrencesCounter"),
    "wordsCounter": document.getElementById("wordsCounter"),
    "sentencesCounter": document.getElementById("sentencesCounter"),
    "statisticsWindow": new PopupWindow(document.getElementById('statisticsWindow'), document.getElementById('statisticsButton')),
    "statistics_vowels": document.querySelector("#statistics_vowels .result"),
    "statistics_longestWord": document.querySelector("#statistics_longestWord .result"),
    "statistics_recurringWords": document.querySelector("#statistics_recurringWords .listResult")
};


class App {

    static is_search_active = false;

    static eraseSearch(clearSearchField = true) {
        // By default, erase the search field content
        if (clearSearchField)
            ENV.searchField.value = "";

        // Truncate the occurrences counter and hide the search erasing button
        ENV.occurrencesCounter.innerText = "";
        // clearSearchFieldButton.classList.add("hidden");

        // Disable the search results highlighting
        ENV.editor.classList.add('highlighting_disabled')

        // Set inactive the search tool
        App.is_search_active = false;
    }

    static refreshStatistics(text) {
        ENV.statistics_vowels.innerText = TextAnalyzer.countVowels(text);
        ENV.statistics_longestWord.innerText = TextAnalyzer.longestWord(text);
        ENV.statistics_recurringWords.innerHTML = TextAnalyzer.recurringWords(text);
    }

    static plural(number) {
        return number !== 1 ? "s" : "";
    }

    constructor() {
        /*EVENTS MANAGING*/

        /*--Editor events--*/

        // On paste onto the editor, paste as plain text
        ENV.editor.addEventListener('paste', function (event) {
            event.preventDefault();
            document.execCommand('inserttext', false, event.clipboardData.getData('text/plain'));
        });

        // On input in the editor, refresh the stats and erase the search
        ENV.editor.addEventListener("input", function() {
            let text = ENV.editor.innerText;
            ENV.wordsCounter.innerHTML = TextAnalyzer.countWords(text);
            ENV.sentencesCounter.innerHTML = TextAnalyzer.countSentences(text);
            if (!App.is_search_active)
                App.eraseSearch(false);
        });


        /*--Search field events--*/

        // On input in the search field, launch a search
        ENV.searchField.addEventListener("input", function () {
            TextAnalyzer.searchOccurrences(ENV.searchField.value);
        });

        // On press enter in the search field, launch a search
        ENV.searchField.addEventListener('keyup', function(event) {
            if (event.key === "Enter") {
                TextAnalyzer.searchOccurrences(ENV.searchField.value);
            }
        });

        // On click on the "search" button, launch a search
        ENV.searchButton.addEventListener("click", function () {
            TextAnalyzer.searchOccurrences(ENV.searchField.value);
        });

        // On click on the search erase button, erase the search
        ENV.clearSearchFieldButton.addEventListener("click", function () {
            App.eraseSearch(true);
        });


        /*--Statistics window events--*/
        ENV.statisticsWindow.showButton.addEventListener("click", function () {
            App.refreshStatistics(ENV.editor.innerText);
            ENV.statisticsWindow.show()
        });
        ENV.statisticsWindow.closeButton.addEventListener("click", function () {
            ENV.statisticsWindow.hide()
        });

    }
}

new App();