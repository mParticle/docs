---
title: Data Filter
order: 5
---

A key benefit of mParticle is the ability to collect your data only once, no matter how many places you need to use it. However, you probably don't want _all_ of your data going to every output service you use. For this reason, mParticle provides the Data Filter as a simple way to control the flow of data to your outputs.

The Data Filter displays a complete list of all data points (a data point can be an event, an attribute of a user or event, or a user identifier) collected in your workspace, and allows you to disable forwarding of any individual data point to any of your output services.

The following video explains data filtering in mParticle:

<p><iframe src="//fast.wistia.com/embed/iframe/xeh6qoaiqw" width="640" height="360" frameborder="0" allowfullscreen=""></iframe></p>

## Find Your Data Points

![](/images/Platform-Update-Data-Filter-Overview-042019.png)

The first time you visit the Data Filter, you will see an empty grid. To start filtering you need to:

1. **Choose your input source.** You can filter data from 'Platforms' (iOS, Android, Web, etc.) or from incoming Feeds. Note that data for all your platforms will be included on one page in the Data Filter, so if you have used different event names or data types for different platforms, make sure you account for all of them.
2. **Add outputs.** You can add an output to each column by clicking the **+**, or select and sort your outputs in the Choose Integrations dialog by clicking the button above, and to the right of, the grid.
3. **Choose a Data Type.** Depending on the data available in your workspace, you can select from up to four data tabs: Events, Users, Screens and E-Commerce.

## Disable Data Points

You can filter event data at 3 levels: Event Type, Event Name and Event Attributes.

* Disabling an event type will disable forwarding for all events and attributes of that type.
* Disabling an event name will disable forwarding for all that event's attributes.

![](/images/event-filter-disable.gif)

<aside>
	<p>It's important to remember that the Data Point Filter is independent from the mParticle forwarders that handle transforming and forwarding your data to each output service. It includes switches for every data point, even if that data point is never forwarded to a particular output service. For example, Amplitude only accepts Customer ID and Email Address as User IDs. Leaving the filter switches on for other ID types will have no effect.</p>
	<img alt="small" src="/images/Platform-Update-Data-Filter-Filters-No-Effect-042019.png">
	<p>Always check the documentation for each integration for details on what data is forwarded.<p>
</aside>



## New Data Points

The Filter allows you to disable any current data point from being forwarded to any current output service. However, as you continue to use mParticle, update your app instrumentation, and add inputs, you will continue to generate new data points. One of the most important decisions to make in the Filter is how to handle new data points for each output service. By default, mParticle will automatically forward new data points to each output service. If you uncheck the **Send new data points by default** box, no new data points will be forwarded to that output until you explicitly enable it in the Filter.

New data points will be added to the Data Filter the first time mParticle receives them. It should only take a few minutes from mParticle receiving a data point for it to be visible in the Data Filter.

![medium](/images/Platform-Update-Data-Filter-New-Data-Points-042019.png)


## Shortcuts

A mature mParticle project may have hundreds of events. That's a lot of filter switches. To save you time, we provide some convenience methods to help you set your filters quickly. To access the shortcuts for an output service, click the elipsis near the top of the column.

![medium](/images/Platform-Update-Data-Filter-Filter-Helpers-042019.png)

From this menu you can:
* Turn all filters on or off.
* Copy all settings for an output and apply them to another output.




