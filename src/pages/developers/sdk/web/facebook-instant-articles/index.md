---
title: Facebook Instant Articles
order: 12
---

The web SDK can be used to track activity in Facebook Instant Articles. To initialize the web SDK in your Instant Articles, you need to embed the snippet inside an `<iframe>` tag, somewhere in the `<body>` of the article.

You must explicitly set `window.config.useNativeSdk` to `false` for the SDK to work inside a Facebook mobile webview.

Facebook will set the document origin to be the same as the resolved URL used to post or share the Instant Article or, if that URL returns a redirect response, to the last URL in the redirect chain. 

Facebook also exposes an `ia_document` JavaScript object which can be used to populate tracking data.

See Facebook's [Instant Article documentation](https://developers.facebook.com/docs/instant-articles/analytics) for more information.
