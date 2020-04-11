---
title: Overview
---

In a mobile environment, most of mParticle's integrations involve collecting data using the mParticle SDK, transforming it into a format accepted by the partner and forwarding it to the partner, server-to-server. Occasionally, there are features of a partner platform, using their own SDK, which are not currently supported using mParticle's SDK and S2S forwarding.

In these cases, it may be possible to create an embedded kit integration. In this scenario, the partner develops a version of their SDK, delivering key functionality, that can be wrapped by the mParticle SDK, allowing direct communication between client mobile app and the partner.

Typically, mParticle will only commit to supporting an embedded kit integration when an mParticle customer has indicated that it is a requirement and committed to incorporating the kit into their app.

On web, our integrations involve collecting data using the mParticle SDK, transforming it into a format accepted by the partner and forwarding it client-side via the browser.

The following resources are available for developing embedded kit integration:

* Android  
    * [Example Kit](https://github.com/mparticle-integrations/mparticle-android-integration-example)  
    * [Development Guide](/developers/partners/kit-integrations/android-kit/)  

* iOS  
    * [Example Kit](https://github.com/mparticle-integrations/mparticle-apple-integration-example)   
    * [Development Guide](/developers/partners/kit-integrations/ios-kit/)

* Web  
    * [Example Kit](https://github.com/mparticle-integrations/mparticle-javascript-integration-example)  
    * [Development Guide](/developers/partners/kit-integrations/javascript-kit/)  

As with other integration types, you will need to provide a high resolution logo for your company in SVG format, for our integration directory. mParticle will work with you to collect other information required and to test and deploy your integration.
