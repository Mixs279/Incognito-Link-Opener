chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'openInIncognito' && message.url) {

		chrome.windows.create({
			url: message.url,
			incognito: true
		}, (window) => {
			if (chrome.runtime.lastError) {
				console.error("Error opening incognito window: ", chrome.runtime.lastError);
			}
		});
	}
});