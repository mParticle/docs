---
title: Catalog
order: 2
seoTitle: mParticle Catalog documentation
seoDescription: Learn how the catalog gives you a single view of every unique event, attribute, and identity collected in an mParticle workspace.
---

Catalog gives you a single view of every unique event, attribute and identity collected in an mParticle workspace, detailed insights into each of these data points, and lets you provide your own annotations. 

## List view

You can use the Catalog's List view to:
- View a centralized listing of all the data points.
- Spot data points which are duplicated, inconsistently named, etc.
- Identify and eliminate unnecessary or redundant data points


The list view displays six main categories:
* Custom Events
* Screen Views
* Commerce
* User Information
* Application Lifecycle
* Consent


![](/images/data-master-main.png)

<aside class="notice">The Catalog will only show a category heading if there is at least one matching data point to display. Click on any data point to see detailed information. You can also add a description directly from the list view.
</aside>

## Date Range, Search, and Filter

You can filter the list view to display specific data points:

* **Date Range**: show data points that have been seen within a selected date range.

* **Search**: show data points with a matching name or description.

* Filter icon: show data points that match the criteria you specify:

  * **Input/App Version**: show data points that have been seen for the selected inputs/app versions.

  * **Environment**: show data points that have been seen in the `dev` or `prod` environments.
  * **Channel**: show data points that have been seen for the selected channel. Channel is distinct from input and describes how a data point arrived at mParticle. For example, a data point may arrive fron the client-side, server-side, or from a partner feed. Valid channels include:
    - `native`
    - `javascript`
    - `pixel`
    - `partner`
    - `server_to_server`

Combine date ranges and filters with your search terms to quickly browse and explore data points. Setting a filter will also clear any current category selection.

## Details view

The details view gives you detailed information on an individual data point, including environments the event has been captured for, and when an event was last seen for each platform. 

Users with `admin` access can annotate data points in the following ways:

* **Tags**: a freeform list of labels you'd like to associate to the data point.
* **External Link**: a link to your wiki or any other resource containing documentation about the data point
* **Description**: a custom text field where you can describe the data point, expected attributes, how it's used, and any other relevant information.
* **Additional Names**: a list of alternate names the data point is known by. For example, legacy names or names from a partner feed.

### Data Point Attributes

Your event data points may include attributes, and the details view shows every attribute name that has ever been seen within the given data point. You can see the total volume received in the last 30 days, when the attribute was last seen, and the *detected* data type. The supported detection types are:

* String
* String-list
* Boolean
* Number
* Date-time

![](/images/data-master-details-view-3.png)

<aside class="notice">The data type of a new attribute defaults to string but is updated automatically as you capture more data.</aside>

## Stats view

<aside class="notice">Dates and times shown on the Stats view are in UTC.</aside>

For data points, the stats view shows two important groups of statistics for a selected date:

* **Input** stats show how many instances of the event have been received, by platform and channel.
* **Output** stats show the volume sent to each output, as well as the delta between the number of events received and outgoing messages sent. This delta can be useful for troubleshooting, but note that the difference between volume sent and received usually doesn’t indicate a problem. Expansion of eCommerce events can cause multiple messages to be sent to an output for a single event. Likewise, filtering or an output partners minimum requirements can cause mParticle not to forward every event we receive.

![](/images/data-master-stats-1.png)
