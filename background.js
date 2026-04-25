chrome.action.onClicked.addListener(() => {
    chrome.tabs.query({}, (tabs) => {
        const existing = tabs.find(tab => tab.url && tab.url.includes("newtab.html"));

        if (existing) {
            chrome.tabs.update(existing.id, { active: true });
        } else {
            chrome.tabs.create({ url: "newtab.html" });
        }
    });
});
