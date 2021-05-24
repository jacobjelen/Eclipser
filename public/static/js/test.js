console.log("=TEST=")
console.log(getDomains())
console.log("=TEST=")


async function getDomains(){
    let r = await returnDomains();
    return r
}

function returnDomains() {
    chrome.storage.sync.get('settings', (result) => {
        return result
    });
}

