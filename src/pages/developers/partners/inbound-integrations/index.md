---
title: Inbound Integrations
order: 3
---

Partners can send client data to mParticle as a Feed, so that mutual customers can forward their data on to other services. To make a customer's data available as a Feed, you need to send it to mParticle's [Events API](/developers/server/http/) using our dedicated partner URLs:

<table style="width:100%; padding:10px;">
  <tr>
    <th style="padding-left: 20px;">Endpoint</th>
    <th style="padding-left: 40px;">Partner URLs</th>
    <th></th>
  </tr>
  <tr>
    <td>events</td>
    <td><code>https://inbound.mparticle.com/s2s/v2/events </code></td>
  </tr>
    <tr>
    <td>bulkevent</td>
    <td><code>https://inbound.mparticle.com/s2s/v2/bulkevents </code></td>
  </tr>
    <tr>
    <td>bulkevents/historical</td>
    <td><code>http://inbound.mparticle.com/s2s/v2/bulkevents/historical </code></td>
  </tr>
</table>



mParticle will provide you with a template to complete with information about your company and the data your feed will provide. We will also work with you to document your feed and test that it performs as expected.

To build a Feed integration, you need to:

1. Create a function or service to convert the data you want to forward into mParticle's batch format.
1. Create a secure way for your clients to be able to provide you with the API Key and Secret necessary to send their data to mParticle's Events API. You can either build this into your Platform UI or communicate directly with each client wanting to access your Feed in mParticle.
1. Using the credentials provided by each client, forward data to our HTTPS API endpoint. See our [Events API documentation](/developers/server/http/) for more information.

Don't forget to provide a high-resolution logo to mParticle in SVG format with a transparent background.
