let isTestActive = false;
let testTabId = null;
let testUrl = null;

// Initialize state from storage
chrome.storage.local.get(['isTestActive', 'testTabId', 'testUrl'], (result) => {
  if (result.isTestActive) {
    isTestActive = result.isTestActive;
    testTabId = result.testTabId;
    testUrl = result.testUrl;
  }
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'TEST_START') {
    // Check for other active extensions first
    chrome.management.getAll((extensions) => {
      // Find extensions that are enabled, and NOT this extension itself
      const activeOtherExtensions = extensions.filter(ext =>
        ext.enabled &&
        ext.id !== chrome.runtime.id &&
        // Also we might want to ignore the default Chrome apps or themes
        ext.type === 'extension'
      );

      if (activeOtherExtensions.length > 0) {
        // Return failure and the list of active extension names
        const extensionNames = activeOtherExtensions.map(ext => ext.name);
        console.log("Blocked start due to active extensions:", extensionNames);
        sendResponse({
          status: 'blocked',
          reason: 'other_extensions_active',
          extensions: extensionNames
        });
        return;
      }

      // 2. Check for other open tabs
      chrome.tabs.query({}, (tabs) => {
        const currentTabId = sender.tab ? sender.tab.id : null;
        // Filter out the current test tab, and potentially devtools windows
        const otherTabs = tabs.filter(tab => tab.id !== currentTabId && !tab.url.startsWith('devtools://'));

        if (otherTabs.length > 0) {
          console.log(`Blocked start due to ${otherTabs.length} other tabs being open.`);
          sendResponse({
            status: 'blocked',
            reason: 'other_tabs_open',
            count: otherTabs.length
          });
          return;
        }

        // If no other extensions are active AND no other tabs are open, proceed with lock
        isTestActive = true;
        testTabId = currentTabId;

        if (sender.tab && sender.tab.url) {
          testUrl = new URL(sender.tab.url).origin;
        } else if (message.url) {
          testUrl = new URL(message.url).origin;
        }

        chrome.storage.local.set({ isTestActive, testTabId, testUrl });
        sendResponse({ status: 'Test mode activated' });
        console.log("Test started. Allowed origin:", testUrl);
      });
    });

    // Return true to indicate we will send a response asynchronously
    return true;
  }
  else if (message.type === 'TEST_END') {
    isTestActive = false;
    testTabId = null;
    testUrl = null;
    chrome.storage.local.set({ isTestActive: false, testTabId: null, testUrl: null });
    sendResponse({ status: 'Test mode deactivated' });
    console.log("Test ended.");
  }
});

// Intercept tab updates (navigation)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!isTestActive) return;

  if (!changeInfo.url) return;

  // Allow internal Chrome URLs to prevent breaking the browser UI completely
  if (changeInfo.url.startsWith('chrome://') || changeInfo.url.startsWith('chrome-extension://') || changeInfo.url.startsWith('edge://')) {
    return;
  }

  try {
    const targetOrigin = new URL(changeInfo.url).origin;
    // If the navigation is not to the test origin, block it
    if (testUrl && targetOrigin !== testUrl) {
      console.log(`Blocking navigation to ${changeInfo.url} during active test.`);
      chrome.tabs.remove(tabId);
    }
  } catch (e) {
    console.error("Invalid URL:", changeInfo.url);
    chrome.tabs.remove(tabId);
  }
});

// Intercept new tab creation
chrome.tabs.onCreated.addListener((tab) => {
  if (!isTestActive) return;

  const urlToCheck = tab.pendingUrl || tab.url;

  if (urlToCheck) {
    if (urlToCheck.startsWith('chrome://') || urlToCheck.startsWith('chrome-extension://') || urlToCheck.startsWith('edge://')) {
      return;
    }
    try {
      const targetOrigin = new URL(urlToCheck).origin;
      if (testUrl && targetOrigin !== testUrl) {
        console.log(`Closing new tab to ${urlToCheck} during active test.`);
        chrome.tabs.remove(tab.id);
      }
    } catch (e) {
      chrome.tabs.remove(tab.id);
    }
  }
});
