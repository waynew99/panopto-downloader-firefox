chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request=="findRSS") {
        feed = document.getElementById("rssFeed").href;
        RSSFile = retrieveRSS(feed);

        var parser = new DOMParser();

        // Use it to turn your xmlString into an XMLDocument
        var xmlDoc = parser.parseFromString(RSSFile, "application/xml");


        let dict = {};
        let itemArray = xmlDoc.getElementsByTagName("item");

        for (const index in itemArray) {
            // for each video
            if (+index < itemArray.length) {
                const title = itemArray[index].getElementsByTagName("title")[0].innerHTML;
                const url = itemArray[index].getElementsByTagName("enclosure")[0].getAttribute("url");
                dict[title] = url;
            }

        }
        // process RSS files
        sendResponse(dict); //fill later
    }
});


function retrieveRSS (sourceRSS) {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }

    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            return xmlhttp.responseText;
        }
    }
    
    xmlhttp.open("GET", sourceRSS, false);
    xmlhttp.send();
    
    return xmlhttp.responseText;
}