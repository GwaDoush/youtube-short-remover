const style = document.createElement('style');
style.innerHTML = `
.short {
    display: none !important;
}
`;
document.head.appendChild(style);

var shortCount = 0

const youtubeApp = document.querySelector('ytd-app');
const config = { childList: true, subtree: true };
const mutationCallback = () => {
    const thumbnails = document.querySelectorAll('ytd-grid-video-renderer:not(.short):not(.no-short)')
    const thumbnailsMapping = Array.from(thumbnails).map(it => ({
            node: it, 
            isShort: it.querySelectorAll('ytd-thumbnail a[href*="short"]').length > 0
        })
    )
    thumbnailsMapping.forEach(it => it.isShort ? shortCount++ && it.node.classList.add("short") : it.node.classList.add("no-short"))
    notify(shortCount)
};

const observer = new MutationObserver(mutationCallback);
observer.observe(youtubeApp, config);

const notify = (shortCount) => {
    browser.runtime.sendMessage({command: "short-count", shortCount});
}