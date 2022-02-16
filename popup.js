document.addEventListener("DOMContentLoaded", function() {
  document.querySelector('button').addEventListener('click', onclick, false)

  function onclick() {
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, "findRSS", setContent);
    })
  }

  function setContent (res) {
    let content = '<div><form>';

    for (const key in res) {
      content += `<input type="checkbox" id=${key} name=${key}><label for=${key}> ${key}</label><br>`;
    }

    content += '<input type="submit" value="Submit"></form></div>';
      
    document.body.innerHTML += content;
  }

}, false)