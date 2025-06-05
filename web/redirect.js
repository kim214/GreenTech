// Change "yourapp" to your actual app scheme (e.g., "greentech")
const deepLinkUrl = "greenTech://login";

setTimeout(() => {
    window.location.href = deepLinkUrl;
}, 3000);
