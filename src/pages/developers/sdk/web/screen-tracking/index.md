---
title: "Page View Tracking"
order: 3.1
---

Log your navigation events as page views and let mParticle translate your data into the appropriate format for each output integration.

The web SDK's `logPageView` method takes three arguments:  
* Event Name (e.g. `"Product Detail Page"`)  
* Attributes (e.g. `{"url": window.location.toString()}`)
* Custom Flags (e.g. `{"Google.Page": window.location.pathname.toString()}`) 

The <strong>Event Name</strong> field should be set to a generic page name. For example, an e-commerce website could have hundreds of product detail pages. To log these correctly, you should use a generic name for <strong>Event Name</strong> (e.g. `"Product Detail Page"`) and then log the url and other attributes of the page as <strong>Attributes</strong>.

~~~javascript
mParticle.logPageView(
	"Product Detail Page",
	{page: window.location.toString()},
	{"Google.Page": window.location.pathname.toString()} // if you're using Google Analytics to track page views
);
~~~

<aside class="notice"><p>If you are collecting data from a <strong>single page app</strong> and you are integrating with <strong>Google Analytics</strong>, you should follow <a href="/integrations/google-analytics/event/#single-page-web-apps">these instructions</a> to ensure pages are tracked accurately .</aside>