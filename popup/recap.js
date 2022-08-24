browser.runtime.getBackgroundPage().then(window => document.querySelector('#short-count').innerHTML = window.document.shortCount || 0)
