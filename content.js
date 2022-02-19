browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request == "findRSS") {
        try {
            feed = document.getElementById("rssFeed").href;
        } catch (error) {
            sendResponse("No RSS found");
            return;
        }

        RSSFile = retrieveRSS(feed);

        var parser = new DOMParser();

        // Use it to turn your xmlString into an XMLDocument
        var xmlDoc = parser.parseFromString(RSSFile, "application/xml");


        let dict = {};
        let itemArray = xmlDoc.getElementsByTagName("item");

        if (itemArray.length > 0) {
            for (const index in itemArray) {
                // for each video
                if (+index < itemArray.length) {
                    const title = itemArray[index].getElementsByTagName("title")[0].innerHTML;
                    const url = itemArray[index].getElementsByTagName("enclosure")[0].getAttribute("url");
                    dict[title] = url;
                }
            }
            sendResponse(dict);
        } else {
            console.log("second not found");
            sendResponse("No RSS found");
        }
    }
});


function retrieveRSS(sourceRSS) {
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