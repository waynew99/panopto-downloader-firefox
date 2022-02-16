chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request=="findRSS") {
        feed = document.getElementById("rssFeed").href;
        //alert(feed);
        // process RSS files
        sendResponse({
            "lecture 1": "link1",
            "lecture 2": "link2"
        }); //fill later
    }
});
