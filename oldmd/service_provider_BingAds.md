
## Bing Ads

Bing Ads Universal Event Tracking (UET) you can create one UET tag and place it across your website, allowing you to collect data for tracking conversion goals and targeting audiences with remarketing lists.

### Supported Features

* Conversion Tracking

### Prerequisites

In order to enable mParticle's integration with Bing, you will need your Universal Event Tracking (UET) Tag ID.  Follow the steps [here](http://help.bingads.microsoft.com/#apex/3/en/56682/2) to create your UET tag.  In the View UET tag tracking code box, your Tag ID will be shown.

### Event Data Mapping

At least one of the following fields is required to forward events to Bing: 

* Event Category
* Event Label
* Event Value

mParticle maps logged events to Bing's event structure as follows:

Bing Parameter | Description | Mapping 
|-
ec | Event Category | `event.EventCategory`
ea | Event Action | Set to 'pageLoad' or 'ecommerce', if `logEvent` or `logPurchaseEvent` is called, respectively.
el | Event Label | `event.EventName`
ev | Event Value  | Set to the 'Bing.EventValue' Custom Flag
gv | Goal Value (Variable Revenue) | `event.ProductAction.TotalAmount` (Only used if `logPurchaseEvent` is called)
