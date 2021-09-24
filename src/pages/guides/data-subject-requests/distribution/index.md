---
title: DSR Distributions for Erasure
---

You can configure mParticle to distribute Data Subject Requests (DSRs) for erasure to a number of supported partners. Once forwarded, mParticle can't guarantee that data is deleted by the partner, so confirm that each partner fulfills the request.

| **Note:** Data subject request (DSR) distribution is available in limited access. |
|---|

# Supported Partners

You can distribute DSRs for erasure to the following partners.  Click on the partner name to get details of their erasure APIs.:

| Partner | Supported IDs | Distribution Frequency | 
| :------ | :------------ | :--------------------- | 
| [Kochava](https://support.kochava.com/reference-information/kochava-privacy-request/) | IDFA (iOS Advertising ID) and ADID (Android Advertising ID) | Once an hour or every 10,000 messages|
| [Blueshift](https://developer.blueshift.com/reference/post_api-v1-customers-delete) | customer_id, email | Immediate |

For partners currently not supported, work with each partner separately to manage user data deletion.

# Create a DSR Distribution

To create a DSR distribution:

1. [Obtain access credentials for each partner](#obtain-partner-access-credentials).
2. [Configure and activate the DSR distribution](#create-and-activate-the-dsr-distribution).
3. [Submit DSR distributions for erasure using the UI or API](#submit-dsr-distributions).
4. [Verify that each partner has fulfilled the request](#verify-partner-fulfillment).

## Obtain Partner Access Credentials

Collect the partner's credential information to use in the next step:

* For Blueshift, copy [the Users API key](https://developer.blueshift.com/reference#authorization-1). You must be a Blueshift admin user to see this information.  Enable `Delete All Matching Customers` if you want to delete all matching profiles of a user in Blueshift.

* For Kochava, obtain [the Kochava Account ID](https://support.kochava.com/reference-information/kochava-privacy-request/) and [App GUID](https://support.kochava.com/reference-information/locating-an-app-guid/) from your Kochava app. 
  
If you can't find the information, contact your partner account representative.

## Create and Activate the DSR Distribution

1. From your mParticle workspace, open **Setup > Outputs** and select the **Data Subject Requests** tab.
2. Click **Add Data Subject Request**.
3. Choose a partner.
4. In the Data Subject Request dialog, add a **Configuration Name** and the access credential values you obtained in the previous section.
5. When you are ready, set **Distribution Status** to **Active**.
6. Select **I understand** after reading the DSR Distribution disclaimer.

![Image of Data Subject Request dialog](/images/dsr/dsr-dialog.png)

## Submit DSR Distributions

After the DSR distribution is configured, use either the mParticle user interface or API to submit DSR distributions.

* [Instructions for the user interface](/guides/data-subject-requests/#erasure)
* [Instructions for the API](/developers/dsr-api/#submit-a-data-subject-request-dsr)

<!-- TODO: Change two links above to indirect references before publishing as exposed in left nav. -->

### DSR Distribution Considerations

Before you submit a DSR distribution, consider the following:

* To avoid profile resolution complexities and subsequent conflation of user data deletion downstream, only a single profile will be resolved. All other identities known for the resolved user profile will be enriched onto the user deletion message sent downstream.
* When using the API or user interface, only a single identity of the same identity type is allowed when DSR distribution has been enabled. For example, a single customer ID, email address, IDFA. You can send in multiple identities of different types such as Customer ID and email address. See [API error messages](#api-error-messages) for ID validation rules.
* To distribute DSR deletion for multiple user profiles, send one erasure request per user profile.
* mParticle forwards erasure requests on receipt of the request. The general processing time specified in [General Request Workflow](/guides/data-subject-requests/#general-request-workflow) only applies to the mParticle fulfillment processing and does not apply to DSR distribution. 
* Once forwarded, mParticle cannot guarantee that data is deleted by the partner. You can confirm with the partner that the request has been fulfilled.

### Check Distribution Status

To check distribution status per partner, use the [`GET /requests/{RequestID}`](/developers/dsr-api#get-the-status-of-an-opendsr-request) resource. The status reported is for distribution and does not indicate fulfillment status from the partner.

Example Response Body

~~~http
{
    "controller_id": "3707",
    "expected_completion_time": "2021-09-13T00:00:00",
    "subject_request_id": "a99fa032-0200-47fb-9785-cbce92dd40b9",
    "group_id": null,
    "request_status": "pending",
    "api_version": "2.0",
    "results_url": null,
    "extensions": {
        "opendsr.mparticle.com": {
            "distribution_status": [
                {
                    "domain": "kochava.com",
                    "name": "Kochava DSR Federation",
                    "status": "pending",
                    "status_message": null
                },
                {
                    "domain": "blueshift.com",
                    "name": "Blueshift DSR Federation",
                    "status": "sent",
                    "status_message": null
                }
            ]
        }
    }
}
~~~

## DSR Distribution Status Definitions

The `status_message` contains additional details for `skipped` and `failed` status.

| Status | Description |
| :--- | :--- |
| `pending` | The request has been queued for forwarding. |
| `skipped` | Request was not forwarded due to missing identities. |
| `sent` | The request has been forwarded. |
| `failed` | The request could not be sent, possible reasons are invalid credentials, partner API errors.  |

## API Error Messages

If you have enabled DSR distributions, additional identity validation is performed which may result in an HTTP 400 status code response, with details contained in the `message`.

1. More than one `mpid` is provided.
2. More than one identity of the same type is provided in the subject identities.
3. More than one identity of the same type is provided in the extensions.
4. An `mpid` is provided and additional identities are present.
5. The same identity type is provided in subject identities and in the extensions.

### Example Response Body

~~~http
{
    "code": 400,
    "message": "Only one mpid per request is allowed when request distribution is enabled. Please check the 'mpids' collection in the extensions.",
    "errors": [
        {
            "domain": "Validation",
            "reason": "InvalidOperationException",
            "message": "Only one mpid per request is allowed when request distribution is enabled. Please check the 'mpids' collection in the extensions."
        }
    ]
}
~~~

| Field Name| Data Type	| Description |
| --- | ---	| --- |
| `code` | integer | HTTP status code
| `message` | string | Detailed validation message 
| `errors` | collection | A collection of validation errors containing a domain, reason and message. |

