let color = '#aaaaaa';

//Hard coded RSS resource
myRSSList = [
  "abcde"
];

// Grab RSS list from the current webpage

// Store RSS list into storage
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ myRSSList });
  console.log('RSSList set with: ', myRSSList);
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});
