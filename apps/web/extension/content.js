// Listen for messages from the web page context
window.addEventListener("message", (event) => {
  // We only accept messages from ourselves
  if (event.source !== window) return;

  if (event.data && event.data.type) {
    if (event.data.type === "SAFE_EXAM_START") {
      // Forward the message to the background script
      chrome.runtime.sendMessage({ type: "TEST_START", url: window.location.href }, (response) => {
        console.log("Safe Exam Extension:", response ? response.status : "No response");
        // Reply back to the web page with the full response
        window.postMessage({ type: "SAFE_EXAM_ACK", action: "start", payload: response || {} }, "*");
      });
    } else if (event.data.type === "SAFE_EXAM_END") {
      chrome.runtime.sendMessage({ type: "TEST_END" }, (response) => {
        console.log("Safe Exam Extension:", response ? response.status : "No response");
        // Reply back to the web page to confirm
        window.postMessage({ type: "SAFE_EXAM_ACK", action: "end", payload: response || {} }, "*");
      });
    }
  }
});
