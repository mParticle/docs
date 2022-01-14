---
title: Custom Feed
---

Custom Feeds allow you to stream data into mParticle from any data source using mParticle's [Events API](/developers/server/http/), including, but not limited to: 

* Marketing automation  
* CRMs  
* Data/analytics services  
* Custom servers/databases  

When you add the Custom Feed to your app, you will be issued an API Key and Secret. Use these credentials to [authenticate](/developers/server/#authentication) and send data via the Events API.

When connecting this Feed to an Output, be aware that the features supported in the Output platform will depend on the data you send. Read the documentation for the particular Output configuration carefully and make sure you include all required data in the appropriate format.