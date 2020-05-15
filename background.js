// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: "#3aa757" }, function () {
    console.log("The color is green.");
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.contentScriptQuery == 'queryYT') {
      var url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${request.maxWord}&type=video&key=${request.ytKey}&maxResults=1`
      fetch(url)
          .then(response => response.json())
          .then(data => sendResponse(data))
          .catch(error => sendResponse(error))
      return true;  // Will respond asynchronously.
    }
  });