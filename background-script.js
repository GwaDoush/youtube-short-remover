browser.runtime.onMessage.addListener((message) => {
    if (message.command === "short-count") {
      document.shortCount = message.shortCount
    }
  });