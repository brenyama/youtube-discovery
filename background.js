// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: "#3aa757" }, function () {
    console.log("The color is green.");
  });
});

class HtmlParser {
  constructor(htmlString) {
    this.maxWord = this.getMaxWord(this.parse(htmlString));
  }

  parse(htmlString) {
    // run regex to replace the html tags and anything inside the tags with empty string ///(<([^>]+)>)/ig
    let stripped = htmlString.replace(/(<([^>]+)>)/gi, "");
    console.log(stripped, "stripped ln 21");
    // take the parsed string, remove anything not alphanumeric.
    stripped = stripped.replace(/[^a-z]/gi, " ");
    // take all letters and lowercase all characters so we can match words
    stripped = stripped.toLowerCase();
    // split string by ??? spaces? " "
    const strippedArr = stripped.split(" ");

    const commonWords = [
      "",
      " ",
      "a",
      "about",
      "above",
      "above",
      "across",
      "after",
      "afterwards",
      "again",
      "against",
      "all",
      "almost",
      "alone",
      "along",
      "already",
      "also",
      "although",
      "always",
      "am",
      "among",
      "amongst",
      "amoungst",
      "amount",
      "an",
      "and",
      "another",
      "any",
      "anyhow",
      "anyone",
      "anything",
      "anyway",
      "anywhere",
      "are",
      "around",
      "as",
      "at",
      "back",
      "be",
      "became",
      "because",
      "become",
      "becomes",
      "becoming",
      "been",
      "before",
      "beforehand",
      "behind",
      "being",
      "below",
      "beside",
      "besides",
      "between",
      "beyond",
      "bill",
      "both",
      "bottom",
      "but",
      "by",
      "call",
      "can",
      "cannot",
      "cant",
      "co",
      "con",
      "could",
      "couldnt",
      "cry",
      "de",
      "describe",
      "detail",
      "do",
      "done",
      "down",
      "due",
      "during",
      "each",
      "eg",
      "eight",
      "either",
      "eleven",
      "else",
      "elsewhere",
      "empty",
      "enough",
      "etc",
      "even",
      "ever",
      "every",
      "everyone",
      "everything",
      "everywhere",
      "except",
      "few",
      "fifteen",
      "fify",
      "fill",
      "find",
      "fire",
      "first",
      "five",
      "for",
      "former",
      "formerly",
      "forty",
      "found",
      "four",
      "from",
      "front",
      "full",
      "further",
      "get",
      "give",
      "go",
      "had",
      "has",
      "hasnt",
      "have",
      "he",
      "hence",
      "her",
      "here",
      "hereafter",
      "hereby",
      "herein",
      "hereupon",
      "hers",
      "herself",
      "him",
      "himself",
      "his",
      "how",
      "however",
      "hundred",
      "ie",
      "if",
      "in",
      "inc",
      "indeed",
      "interest",
      "into",
      "is",
      "it",
      "its",
      "itself",
      "keep",
      "last",
      "latter",
      "latterly",
      "least",
      "less",
      "ltd",
      "made",
      "many",
      "may",
      "me",
      "meanwhile",
      "might",
      "mill",
      "mine",
      "more",
      "moreover",
      "most",
      "mostly",
      "move",
      "much",
      "must",
      "my",
      "myself",
      "name",
      "namely",
      "neither",
      "never",
      "nevertheless",
      "next",
      "nine",
      "no",
      "nobody",
      "none",
      "noone",
      "nor",
      "not",
      "nothing",
      "now",
      "nowhere",
      "of",
      "off",
      "often",
      "on",
      "once",
      "one",
      "only",
      "onto",
      "or",
      "other",
      "others",
      "otherwise",
      "our",
      "ours",
      "ourselves",
      "out",
      "over",
      "own",
      "part",
      "per",
      "perhaps",
      "please",
      "put",
      "rather",
      "re",
      "same",
      "see",
      "seem",
      "seemed",
      "seeming",
      "seems",
      "serious",
      "several",
      "she",
      "should",
      "show",
      "side",
      "since",
      "sincere",
      "six",
      "sixty",
      "so",
      "some",
      "somehow",
      "someone",
      "something",
      "sometime",
      "sometimes",
      "somewhere",
      "still",
      "such",
      "system",
      "take",
      "ten",
      "than",
      "that",
      "the",
      "their",
      "them",
      "themselves",
      "then",
      "thence",
      "there",
      "thereafter",
      "thereby",
      "therefore",
      "therein",
      "thereupon",
      "these",
      "they",
      "thick",
      "thin",
      "third",
      "this",
      "those",
      "though",
      "three",
      "through",
      "throughout",
      "thru",
      "thus",
      "to",
      "together",
      "too",
      "top",
      "toward",
      "towards",
      "twelve",
      "twenty",
      "two",
      "un",
      "under",
      "until",
      "up",
      "upon",
      "us",
      "very",
      "via",
      "was",
      "we",
      "well",
      "were",
      "what",
      "whatever",
      "when",
      "whence",
      "whenever",
      "where",
      "whereafter",
      "whereas",
      "whereby",
      "wherein",
      "whereupon",
      "wherever",
      "whether",
      "which",
      "while",
      "whither",
      "who",
      "whoever",
      "whole",
      "whom",
      "whose",
      "why",
      "will",
      "with",
      "within",
      "without",
      "would",
      "yet",
      "you",
      "your",
      "yours",
      "yourself",
      "yourselves",
      "the",
    ];

    // filter out common words as well (e.g. "the", "a", "an")  grab a list of these somewhere.
    const realWords = strippedArr.filter((word) => {
      return !commonWords.includes(word) && word.length > 2 ? true : false;
    });

    return realWords;
  }

  getMaxWord(wordArray) {
    // create a cache object that will store each unique word and the count
    const wordCache = {};

    // create maxCount var = -INFINITY
    let maxCount = -Infinity;
    // create maxWords = []
    let maxWord = null;

    // loop through string array of words
    // count occurences of words
    wordArray.forEach((word) => {
      // check if it's in the cache
      if (!wordCache[word]) {
        // if not, add it
        wordCache[word] = 1;
      } else {
        // else
        // increment word count in the cache.
        wordCache[word]++;
        // check if currCount > maxCount;
        if (wordCache[word] > maxCount) {
          // set maxCount equal to currCount
          maxCount = wordCache[word];
          // set maxWord to [currWord]
          maxWord = word;
        }
      }
    });

    // if max words is empty
    if (maxWord === null) {
      return realWords[0];
    }

    // return the most common words
    return maxWord;
  }
}

// take in a callback that will be invoked whenever this event happens
// within the callback grab the html as a string and save to variable
// instantiate a new instance of html parser with our html string passed in which will get
// passed into our constructor
// access maxWord from htmlParser instance

const htmlString = document.documentElement.innerHTML;
const htmlParsed = new HtmlParser(htmlString);
const maxWord = htmlParsed.maxWord;
const ytKey = "AIzaSyD2nR2MMpT8JnSnywtKpqpUIjVAdrHDJAw";
// take maxWord and pass it to the youtube API

let Url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${maxWord}&type=video&key=${ytKey}`;

// function reqListener() {
//   if (this.readyState === 4 && this.status === 200) {
//     var data = JSON.parse(this.responseText ? this.responseText : "{}");
//     console.log(data);
//   }
// }

// function reqError(err) {
//   console.log("Fetch Error :-S", err);
// }

// var oReq = new XMLHttpRequest();
// oReq.onreadystatechange = reqListener;
// oReq.onerror = reqError;
// oReq.open("GET", Url, true);
// oReq.send();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  var url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${maxWord}&type=video&key=${ytKey}`;
  fetch(url)
    .then((response) => response.text())
    .then((text) => console.log(text))
    .catch((error) => "this is an error");
  return true; // Will respond asynchronously.
});

// create a video tag node and store in a variable
let ytVideo = document.createElement("div");
ytVideo.innerHTML = `<iframe id="youtube-discovery-video" src="https://www.youtube.com/embed/6yItCQB4V9A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
// find the body and store that into a variable
let body = document.querySelector("body");
// prepend video into the body
body.prepend(ytVideo);
