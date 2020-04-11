
## Facebook Atlas

Facebook Atlas is an ad server that also allows ad buyers to measure, target, and optimize digital and mobile ads.

### Supported Features

* Re-Targeting
* Measurement

### Prerequisites

In order to enable mParticle’s integration with Facebook Atlas, you will need a Facebook Atlas account to obtain your Universal Tag ID.  

### Event Data Mapping

mParticle’s integration forwards the following event types to Facebook Atlas:

Event Type | Event Mapping
|-
App Event | event=app_event, app_event_name={appEvent.EventName}, app_event_type={appEvent.CustomEventType}.  All other event attributes passed to mParticle with the event are passed to Facebook Atlas as attribute=value pairs.
Application State Transition | event=app_transition_event, app_transition_type={transition type}
Commerce Events| event=commerce_event, app_event_name={commerceEvent.EventName}.  All other event attributes passed to mParticle with the event are passed to Facebook Atlas as attribute=value pairs.
Opt Out | event=opt_out_event
Screen View | event=screen_view_event, screen_view_name={screenViewEvent.ScreenName}

<aside class="notice">All commerce events will forward multiple events to Facebook Atlas, one for each product.  If the commerce event, specifies an action of Purchase or Refund, an additional event will be forwarded containing overall transaction details.</aside>

