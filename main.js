// take in a callback that will be invoked whenever this event happens
// within the callback grab the html as a string and save to variable
// instantiate a new instance of html parser with our html string passed in which will get
// passed into our constructor
// access maxWord from htmlParser instance
// take maxWord and pass it to the youtube API

let htmlString = document.documentElement.innerHTML;
let htmlParsed = new HtmlParser(htmlString);
console.log(htmlParsed.maxWord);
// tests
