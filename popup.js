document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    
    if (url == undefined || !url.includes("panopto.com")) {
      document.getElementById("loadScreen").innerHTML = "";
      document.getElementById("result").innerHTML = '<p style="margin-bottom: 0px">No videos found.</p><p style="margin-top: 9px">Please navigate to the Panopto folder page containing the videos that you want to download.</p>';
      return;
    } else {
      chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, "findRSS", setContent);
      });
    }
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
    document.getElementById("loadScreen").innerHTML = "";

    if (res == "No RSS found" || res == undefined) {
      document.getElementById("result").innerHTML = '<p style="margin-bottom: 0px">No videos found.</p><p style="margin-top: 9px">Please navigate to the Panopto folder page containing the videos that you want to download.</p>';
    } 
    
    else {
      resObj = res;
      let content = "";
  
      // reverse the sequence of the keys so the popup sequence matches that of the videos
      let keys = Object.keys(res).reverse();
  
      for (const index in keys) {
        content += `<div class="videoItem"><input type="checkbox" class="check" id=${keys[index].replace(/\s/g, '')} name=${keys[index]} value=2><label for=${keys[index]}> ${keys[index]}</label><br></div>`;
      }
      content += '<div id="buttonWrapper"><button class="button" id="submit" type="submit">Download Selected</button></div>';
  

      document.getElementById("result").innerHTML = content;
      document.getElementById('submit').addEventListener('click', onSubmit, false)
    }

  }

}, false)

