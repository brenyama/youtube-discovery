/*
{base_URL}/search?part=snippet
                     &q=YouTube+Data+API
                     &type=video
                     &videoCaption=closedCaption
                     &key={YOUR_API_KEY}
*/

const htmlString = document.body.innerHTML;
const htmlParsed = new HtmlParser(htmlString);
const maxWord = htmlParsed.maxWord;
const wordCache = htmlParsed.wordCache;
console.log(wordCache);
console.log(maxWord);

// const htmlParsedTest = new HtmlParser('<script>hello</script><div>goodbye</div><style>hello</style>')
// console.log(htmlParsedTest.wordeCache)
// console.log(htmlParsedTest.maxWord)

// take maxWord and pass it to the youtube API

// sending request message to background to handle API call.
chrome.runtime.sendMessage({contentScriptQuery: 'queryYT', maxWord: maxWord, ytKey: getKey()}, parseYTData);

// parse the youtube data when message comes back.
function parseYTData(data) {
  
  const ytVidId = data.items ? data.items[0].id.videoId : "";

  // create a video tag node and store in a variable
  let ytVideo = document.createElement("div");
  ytVideo.setAttribute('id', 'yt-main-wrapper');
  ytVideo.innerHTML = `<iframe id="youtube-discovery-video" src="https://www.youtube.com/embed/${ytVidId}?&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

  let ytWrapper = document.createElement('div');
  ytWrapper.setAttribute('id', 'yt-maxword');
  ytWrapper.textContent = `discover ${maxWord}`;

  let ytCount = document.createElement('div');
  ytCount.setAttribute('id', 'yt-maxcount');
  ytCount.textContent =  `${wordCache[maxWord]}`

  ytWrapper.appendChild(ytCount);
  
  ytVideo.prepend(ytWrapper);
  // find the body and store that into a variable
  let body = document.querySelector("body");
  // prepend video into the body
  body.prepend(ytVideo);

  // animate video in
  setTimeout(() => {
    ytVideo.setAttribute('class', 'active')
  }, 500)
}
