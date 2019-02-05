import $ from 'jquery'


$(document).ready(() => {

  let breakdown = document.querySelector("#breakdown-button");
  let inputField = document.querySelector("#input-field")

  breakdown.addEventListener("click", breakDown, false)

  function breakDown() {
    let input = inputField.value
    let words = input.split(" ")
    let newWords = words.map((w) => {
      return(w.replace(/[^a-zA-Z ]/g, ""))
    })

    newWords.forEach((e) => {
      postWord(e)
    })
  };

  function postWord(word) {
    let xhr = new XMLHttpRequest();
    let submitWordBody = JSON.stringify({ "word": { "value": word} });
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        let wordResponse = JSON.parse(xhr.response);
        alert(wordResponse["message"])
        getTopWords()
      }
      else {
        alert('something went wrong');
      }
    };
    xhr.open('POST', `https://wordwatch-api.herokuapp.com/api/v1/words`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(submitWordBody);
  };

})


document.addEventListener('DOMContentLoaded', getTopWords)

function getTopWords() {
  let xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      let topWordResponse = JSON.parse(xhr.response);
      renderTopWords(topWordResponse)
    }
  };
  xhr.open('GET', `https://wordwatch-api.herokuapp.com/api/v1/top_word`);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
};

function renderTopWords(topWordData) {
  let wordbox = document.querySelector("#word-box")
  let topWord = Object.keys(topWordData.word)[0]
  let count = topWordData.word[topWord]
  wordbox.innerHTML = `Top Word: "${topWord}", <br> Count: ${count}`
};
