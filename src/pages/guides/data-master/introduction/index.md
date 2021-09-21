---
title: Introduction
order: 1
seoTitle: mParticle Data Master documentation
seoDescription: Learn how Data Master helps you validate customer data before it gets shared across systems, applications and teams with this documentation guide.
---

Data Master allows you to standardize and validate customer data before it gets shared across systems, applications and teams. It encompasses the following features:
- [**Catalog**](/guides/data-master/catalog/) provides an overview of data collected, including detailed collection statistics. You can add descriptions and other information about data points in the catalog.
- [**Data Plans**](/guides/data-master/data-planning/) allow you to define and then validate the extent and shape of the data that is collected.
- [**Live Stream**](/guides/data-master/live-stream/) allows you to observe data streaming into mParticle in realtime and to identify violations quickly if you are using a Data Plan to validate your data.

## Undertanding Data Points and Data Plans

* For every mParticle workspace, you may have many data plans.
* Every data plan contains one or more data plan versions.
* Each data plan version contains data points that you have defined.

![](/images/dataplan_hierarchy.jpg)

A data point is a unit of data collected by mParticle. Data points represent Events such as Custom Events or Screen Views, or User attributes such as Customer Id or Email.

Each data point includes criteria used to select the data point from an incoming data stream, and a definition called a schema that validates the contents of the data point. You can view data points in all three Data Master tools: Catalog, Live Stream, and Data Plan.

For example, here is a view of the Play Video data point in Catalog:

![](/images/data-master-details-view-3.png)

Here is a view of the a Commerce Event data point in Live Stream:

![](/images/data-point-in-live-stream.png)

This view of a data point is from Data Plan:

![](/images/data-point-in-data-plan.png)
