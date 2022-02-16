document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, "findRSS", setContent);
  });

  let resObj;  // to pass data between setContent and onSubmit

  function onSubmit() {
    let download = {}
    for (const key in resObj) {
      const checkbox = document.getElementById(key.replace(/\s/g, ''));
      if (checkbox.checked) {
        download[key] = resObj[key];
      }
    }
    for (const name in download) {
      chrome.downloads.download({
        url: download[name],
        filename: `${name}.mp4` // Optional
      });
    }
  }

  function setContent(res) {
    resObj = res;
    let content = "";

    // reverse the sequence of the keys so the popup sequence matches that of the videos
    let keys = Array.from(Object.keys(res)).reverse();

    for (const index in keys) {
      content += `<input type="checkbox" id=${keys[index].replace(/\s/g, '')} name=${keys[index]} value=2><label for=${keys[index]}> ${keys[index]}</label><br>`;
    }
    content += '<button id="submit" type="submit">Download Selected</button>';

    document.getElementById("loadScreen").innerHTML = "";
    document.getElementById("checkList").innerHTML = content;
    document.getElementById('submit').addEventListener('click', onSubmit, false)
  }

}, false)

