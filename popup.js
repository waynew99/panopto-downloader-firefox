// Initialize butotn with users's prefered color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});
console.log("hihihihi");

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}

// get the RSS list from the storage
chrome.storage.sync.get("RSSList", ({ myRSSList }) => {
  console.log(document.body.innerHTML);
  console.log(myRSSList)
  document.body.innerHTML += `<form><input type="checkbox" id="video1" name="video1"><label for="vehicle1"> ${myRSSList} </label><br><input type="submit" value="Submit"></form>`;
  console.log(document.body.innerHTML);
});

// populate popup.html with the RSS list