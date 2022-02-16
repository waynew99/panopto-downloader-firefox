let globalRes;  // to pass data between setContent and onSubmit

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('findRSS').addEventListener('click', onclick, false)

  function onclick() {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, "findRSS", setContent);
    })
  }

  function onSubmit() {
    let download = {}
    for (const key in globalRes) {
      const checkbox = document.getElementById(key.replace(/\s/g, ''));
      if (checkbox.checked) {
        download[key] = globalRes[key];
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
    globalRes = res;
    let content = "";
    for (const key in res) {
      content += `<input type="checkbox" id=${key.replace(/\s/g, '')} name=${key} value=2><label for=${key}> ${key}</label><br>`;
    }
    content += '<button id="submit" type="submit">Download Selected</button>';
    document.body.innerHTML += content;
    document.getElementById('submit').addEventListener('click', onSubmit, false)
  }

}, false)

