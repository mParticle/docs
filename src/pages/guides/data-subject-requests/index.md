---
title: Data Subject Requests
---

Both the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA) define that consumers/data subjects have the right to view, update, extract and delete data that controllers & businesses have saved on them. When a consumer/data subject exercises their rights, they create a data subject request (DSR). This page will guide you through mParticle's support for handling DSRs for both GDPR and CCPA.

This page does not provide legal advice, only a description of how to use mParticle's compliance-related features. The information provided here is solely for understanding and using mParticle features and is not intended to be legally compliant or specific enough for compliance.

This document uses GDPR language and terminology for simplicity.

mParticle provides [data privacy controls](/guides/data-privacy-controls) to help you comply with consent and data sale opt-out requirements.

## Roles

The GDPR defines three entities involved in data collection, with different rights and responsibilities:

* Data Subject - A person whose data is gathered. Generally a user of your app.
* Data Controller - An entity gathering the data. mParticle provides tools for Data Controllers to fulfill their obligations under the GDPR.
* Data Processor - An entity that handles or stores data for the Data Controller. Under the GDPR, mParticle acts as a Data Processor.

Similarly, the CCPA defines:
* Consumer - Similar to the GDPR's definition of data subject, geographic requirements notwithstanding.
* Businesses - Similar to the GDPR's definition of data controller.
* Service provider - Similar to GDPR's definition of data processor.

## Rights of Data Subjects

The GDPR defines some rights of Data Subjects, including:

* The right to have data concerning them [erased](https://gdpr-info.eu/art-17-gdpr/). Also known as the 'right to be forgotten'.
* The right to [access](https://gdpr-info.eu/art-15-gdpr/) data concerning them.
* The right to [portability](https://gdpr-info.eu/art-20-gdpr/) of data concerning them, for transfer to another controller.

The CCPA defines that consumers have rights of:
* The right to request the data saved concerning them.
* The right to request any data collected from the consumer be deleted.

## OpenDSR Request Framework

mParticle is a collaborator on the [OpenDSR framework](https://github.com/opengdpr/OpenDSR/), which provides a simple format for Data Controllers and Data Processors to collaborate towards compliance with requests from their Data Subjects to honor the above rights. This framework was formerly known as OpenGDPR; it was renamed in early 2020 to include CCPA support.

To find out more about OpenDSR, read the full spec on the [Github page](https://github.com/opengdpr/OpenDSR).

mParticle's OpenDSR implementation handles three types of DSRs: "Erasure", "Access" and "Portability".

<aside>Note that this documentation only covers how mParticle's role as a Data Processor is fulfilled. Most Data Controllers have more than one Data Processor and will need to work with all of them to fulfill Data Subject requests.</aside>

## General Request Workflow

Each DSR follows the same basic workflow:

1. The data subject submits a DSR to the data controller.

1. The data controller must log, authenticate and verify the request. If they choose to accept the request, the data controller forwards a request to mParticle in its role as a data processor. The request provides:
    * One or more identities for the data subject
    * The type of request: "Erasure", "Access" or "Portability"
    * The time the data subject submitted the request
    * An optional list of status callback URLs

1. On receipt of the request, mParticle sets the status of the request to "Pending" and sends a status callback request to all URLs listed in the original request. This callback includes an expected completion time for the request, which is calculated as: the time it will be scheduled for processing plus 48 hours to ensure the job completes in time.

1. The Data Controller can check the status of the request at any time.

1. When the request is complete, mParticle sends a status callback request to all URLs listed in the original request. For Erasure requests, this callback will simply confirm that the request has been fulfilled. For Access and Portability requests, a download link will be provided.

1. For Access and Portability requests, the download link remains valid for 7 days. Attempting to access the download link after that time will result in a `410 Gone` HTTP response.

This workflow can be managed in mParticle UI or programmatically via the [OpenDSR API](/developers/dsr-api).

## Identifying affected user data

mParticle stores data against user profiles, each identified by an mParticle ID (MPID). To respond to DSRs, mParticle first matches identities in the DSR against observed user profiles. This is handled the same way as mParticle's regular IDSync process: provided identities are resolved to MPIDs to identify affected user data.

Data subject requests submitted without a <a href="https://docs.mparticle.com/guides/idsync/user-data/#login-ids">login ID</a> will not be fulfilled for known profiles that have an associated login ID. For example, if you submit a data subject request that only includes the device ID for a user, mParticle will not be able to find the correct profile to fulfill the request.

When finding the correct profile for a DSR, mParticle follows the same identity resolution process used for general identification requests made to IDSync (the mParticle identity management system).

The exact profiles returned for a data subject request depend on the specific [user identifiers](https://docs.mparticle.com/guides/idsync/user-data/#user-identifiers) supplied with the DSR and the [identity strategy](https://docs.mparticle.com/guides/idsync/components/#identity-strategies) configured for your account.

All DSR requests are scoped to a single workspace by API authentication. If you need to apply a DSR to multiple workspaces, please submit it within each workspace.

## Data Subject Request Settings
To get started, enable GDPR and/or CCPA compliance features on your workspace from **Workspace Settings** > **Workspace** > **Regulation**. This will allow you to see the DSR UI. mParticle will honor all requests received via API even with these features disabled.

You have the option to include a copy of the live user profile in access/portability requests. Navigate to **Privacy** > **Settings** to include a copy of the users profile with GDPR and/or CCPA DSRs. This is for clients whose privacy teams determine that this is required for compliance. The profiles will include: devices, identities, audience memberships, user attributes and calculated attributes. By default, profiles are not included.

<aside>To see these privacy pages you must be in a user role of "Compliance Admin" or "Compliance".</aside>

![](/images/privacy-settings.png)

The following video explains how to use consent to control data forwarding with mParticle:

<p><iframe src="//fast.wistia.com/embed/iframe/lok4iclzb7" width="640" height="360" frameborder="0" allowfullscreen=""></iframe></p>


### Develop a strategy for accepting Data Subject Requests

As a Data Processor, mParticle will match user profiles for a Data Subject Request based on any identities we are given. As a Data Controller, it is your responsibility to determine how to accept and forward Data Subject Requests in order to best meet your GDPR responsibilities and manage risk. This decision should be managed in conjunction with your Identity Strategy.

You also have the option of using the [Identity API](/developers/idsync/) to identify for yourself the MPIDs you wish to include in the request and submitting them directly, rather than letting mParticle match IDs for you.

Be sure to consult your internal privacy and compliance experts when determining your strategy for accepting and forwarding Data Subject Requests.

## Supported Request Types

### Erasure

After mParticle receives an erasure request, a 7 day waiting period starts. This waiting period gives you the opportunity to cancel a pending erasure request before it is initiated. 

After the 7 day waiting period, any pending erasures are initiated. Once begun, it may take up to 14 days before the erasure is complete. For each completed erasure request, mParticle sends a callback to any specified URLs indicating that the request has been fulfilled.

#### Erasure request waiting period

By default, erasure requests are completed between 7 and 21 days after being received by mParticle. The initial 7 day waiting period provides an opportunity to cancel a pending erasure request before it is carried out.

To skip the initial 7 day waiting period when submitting a data subject erasure request to mParticle, check the option labeled **Skip waiting period** in the **New Data Subject Request** modal.

Skipping the waiting period shortens the request cancellation window. This reduces the total time required to complete an erasure request to between 1 and 14 days after it is received by mParticle.

If you wish to remove users from audiences or from event forwarding during the waiting period, set a user attribute and apply audience criteria and/or forwarding rules to exclude them.

<aside>
Most privacy regulations simply require an acknowledgement of a request within an initial time frame. Fulfillment timeframes for requests are typically more generous as they may require follow-up to validate additional details. We recommend consulting the requirements of your privacy regulation to understand your obligations.
</aside>

#### What data is deleted?

In response to a data subject erasure request, mParticle deletes the data it stored, such as historical event batches, audience data, and profiles.

A delete request will also not prevent additional data concerning the subject from being received and processed by mParticle. If the data subject wishes to prevent all future data processing, they will likely need to take additional steps, for example, ceasing to use your service/app.

### Access / Portability

Access and Portability requests are treated exactly the same way, as follows:

1. mParticle identifies the MPIDs that match the request.
2. Just after midnight each Monday and Thursday, mParticle searches for data related to each MPID, including the user profile and historical event batches. 
3. mParticle compiles the data into a single text file. This data includes device identities, user identities, user attributes (including calculated attributes), as well as current audience memberships.
4. mParticle sends a callback to any specified Callback URLs indicating that the request has been completed. The callback will contain a secure download link to the text file containing the Subject's data.

If you submit an access and portabilitiy request for more than one profile using multiple MPIDs, the data for every profile returned will be included in a single file. Since the resolution process for DSRs is the same as the process for IDSync, an access and portability request that includes only a device ID will not return any profiles that are protected by a login ID.

For example, imagine that a user opens your app and is tracked with an anonymous profile, but they do not create an account with a login ID. Later, a different user on the same device opens your app and logs in with a login ID. If you submit an access and portability request but only supply the device ID, then only the data for the anonymous user will be returned.

<aside>
Access / Portability requests are processed every three days on the start of Mondays and Thursdays.
</aside>

#### Access / Portability Response Format

The data gathered in response to an access or portability request will be delivered in a `.zip` folder containing many `.jsonl` files ([JSON Lines](http://jsonlines.org/) format).  The zip contains:

* `profile.jsonl`: A file that contains the live profile at the time of the request. This includes: device identities, user identities, current audience memberships and user attributes (including calculated attributes).
* one or more additional `.jsonl` files: These results are split into many files to avoid a single, large file to make them easier to transmit and process. Controllers are encouraged to re-process the files as they see fit. These files contain the event batches sent to mParticle. Each line of the data files represents a complete mParticle event batch. See our [JSON Reference](/developers/server/json-reference) for a guide to the event batch format.

Note that if no records can be found matching the identities in the request, the request for the zip file will intentionally return a `404` error.

A sample portability response can be downloaded [here](/downloads/portability-response-sample.zip).

## Managing Data Subject Requests in the mParticle Dashboard

In addition to the OpenDSR API, users with the [Compliance role](/guides/platform-guide/users#roles) can create, delete and monitor DSRs directly in the mParticle Dashboard.

<aside>To see these privacy pages you must be in the role of "Compliance Admin" or "Compliance".</aside>

![image of the data subject request UI](/images/dsr/dsr-ui.png)

To view details about a request, click the Request ID number.

## Forwarding Data Subject Requests for Erasure

You can configure mParticle to forward Data Subject Requests (DSRs) for erasure with one or more integrations.

![image of data subject request detail UI](/images/dsr/dsr-details.png)

This detail UI for a data subject request for erasure shows the forwarding status for a request that is being forwarded to three different outputs. 

The forwarding status field contains different values, depending on the situation:
 * `Pending` means that a request has been queued for forwarding, but hasn't been forwarded yet.
 * `Skipped` means that a request for forwarding has been skipped because mParticle could not find suitable identities to forward, either from the original request or the user profile.
 * `Sent` means that a request was forwarded and an acknowledgement of the request to delete the user from the integration was received by mParticle.
 * `Failed` means that an attempt to forward the request was made, but an error occurred.
 * `Not Sent` means that the request was not forwarded, because the request was made using an older version of the DSR API. You must upgrade to the DSR API v3 in order to forward DSR erasure requests.

In addition to the forwarding status, the identities that were forwarded are also shown. mParticle determines which identities to forward based on the identities supplied in the original request, the identity resolution strategy, and what identities each output supports:

* When a single generic identity type (such as email address) is submitted in the erasure request OR
* When multiple generic identities of different types (such as email address and device ID) are submitted in the erasure request and:
    - mParticle resolves it to a single user profile: mParticle enriches the request with all IDs found on the corresponding user profile. mParticle will include all identities supported by the output in the forwarded request.
    - mParticle resolves it to multiple user profiles: mParticle will try to resolve it to a single user profile following your Identity resolution strategy. mParticle then enriches the request with all IDs found on the corresponding user profile. mParticle will include all identities supported by the output in the forwarded request.
    - mParticle cannot resolve it to any user profile: The request may still be forwarded if the vendor supports the ID type provided in the original DSR request.

* When a single MPID is submitted in the erasure request and:
    - mParticle resolves it to a single user profile: mParticle enriches the request with all IDs found on the corresponding user profile. mParticle will include identities supported by the output in the forwarded request.
    - mParticle cannot resolve it to any user profile and nothing will be forwarded.

In the case where the data in a user profile does not match what was provided in the original erasure request, mParticle will use the information from the original erasure request as the source of truth to process and forward the request.

Once a request is forwarded, mParticle can't guarantee that data is ultimately deleted by the integration partner, so confirm that each vendor fulfills the request.

If an integration supports forwarding erasure requests, the integration documentation contains a section “Data Subject Request Forwarding for Erasure” and that section contains specific instructions and information about which identities are forwarded.






To find all the integrations that support forwarding erasure requests, visit [Integrations](/integrations/?category=Data%20Subject%20Request).

## Retention of Data Subject Requests Records

mParticle retains Data Subject Request records for up to 1 year.
