// take in a callback that will be invoked whenever this event happens
// within the callback grab the html as a string and save to variable
// instantiate a new instance of html parser with our html string passed in which will get
// passed into our constructor
// access maxWord from htmlParser instance


let htmlString = document.documentElement.innerHTML;
let htmlParsed = new HtmlParser(htmlString);
console.log(htmlParsed.maxWord);
// tests

// take maxWord and pass it to the youtube API

// take our html from htmlString
// create a video tag node and store in a variable
let ytVideo = document.createElement('div');
    ytVideo.innerHTML = `<iframe id="youtube-discovery-video" src="https://www.youtube.com/embed/6yItCQB4V9A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
// find the body and store that into a variable
let body = document.querySelector('body');
// prepend video into the body
body.prepend(ytVideo);
