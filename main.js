/*
{base_URL}/search?part=snippet
                     &q=YouTube+Data+API
                     &type=video
                     &videoCaption=closedCaption
                     &key={YOUR_API_KEY}
*/

const htmlString = document.documentElement.innerHTML;
const htmlParsed = new HtmlParser(htmlString);
const maxWord = htmlParsed.maxWord;
const wordCache = htmlParsed.wordCache;
console.log(wordCache);
const ytKey = "AIzaSyC1zA9Yfx9Q6RSarv-JJdsY1F596oBxVLY";

console.log(maxWord);

// take maxWord and pass it to the youtube API

// sending request message to background to handle API call.
chrome.runtime.sendMessage({contentScriptQuery: 'queryYT', maxWord: maxWord, ytKey: ytKey}, parseYTData);

// parse the youtube data when message comes back.
function parseYTData(data) {
  console.log(data);
  const ytVidId = data.items[0].id.videoId;

  // create a video tag node and store in a variable
  let ytVideo = document.createElement("div");
  ytVideo.setAttribute('id', 'yt-main-wrapper');
  ytVideo.innerHTML = `<iframe id="youtube-discovery-video" src="https://www.youtube.com/embed/${ytVidId}?&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

  let ytWrapper = document.createElement('div');
  ytWrapper.setAttribute('id', 'yt-maxword');
  ytWrapper.textContent = `${maxWord}: ${wordCache[maxWord]}`;
  
  ytVideo.prepend(ytWrapper);
  // find the body and store that into a variable
  let body = document.querySelector("body");
  // prepend video into the body
  body.prepend(ytVideo);
}
