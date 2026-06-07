document.addEventListener('DOMContentLoaded', () => {
  const statusIndicator = document.getElementById('statusIndicator');
  const statusDesc = document.getElementById('statusDesc');

  chrome.storage.local.get(['isTestActive'], (result) => {
    if (result.isTestActive) {
      statusIndicator.textContent = 'ACTIVE';
      statusIndicator.className = 'status active';
      statusDesc.textContent = 'A test is currently active. Navigation to other tabs is blocked.';
    } else {
      statusIndicator.textContent = 'INACTIVE';
      statusIndicator.className = 'status inactive';
      statusDesc.textContent = 'Your browser is not currently restricted. Good luck on your next test!';
    }
  });
});
