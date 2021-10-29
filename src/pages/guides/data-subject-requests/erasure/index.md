---
title: Data Subject Requests for Erasure
---

You can configure mParticle to forward Data Subject Requests (DSRs) for erasure to a number of supported partners. Once forwarded, mParticle can't guarantee that data is deleted by the partner, so confirm that each partner fulfills the request.

<aside class="notice">Data subject request (DSR) forwarding is an open Beta release. </aside>

You can distribute DSRs for erasure to the following partners.  Click on the partner name to get details of their erasure APIs.

To forward DSRs for erasure:

1. [Obtain access credentials for each partner](#step-1-obtain-partner-access-credentials).
2. [Activate DSR forwarding](#step-2-activate-dsr-for-erasure-forwarding).
3. [Submit DSR for erasure using the UI or API](#step-3-submit-requests-for-erasure).
4. [Check Forwarding Status](#step-4-check-forwarding-status)
5. [Verify that each partner has fulfilled the request](#step-5-verify-partner-fulfillment).

## Step 1: Obtain Partner Access Credentials

Collect partner credential information to use in the next step.

* **Amplitude**

    Obtain [the API key, Secret Key, and Data Center](https://help.amplitude.com/hc/en-us/articles/360058073772#view-and-edit-your-project-information). Authenticate via basic authentication with the project's credentials.

* **Blushift**
    
    Copy [the Users API key](https://developer.blueshift.com/reference#authorization-1). You must be a Blueshift admin user to see this information.  Enable `Delete All Matching Customers` if you want to delete all matching profiles of a user in Blueshift.

* **Braze**
    
    Obtain [the External Identity Type, REST API key, and Data Center](https://www.braze.com/docs/partners/data_and_infrastructure_agility/customer_data_platform/mParticle/mparticle/#2-complete-mparticles-braze-event-kit-integration).
  
* **Kochava**

    Obtain [the Kochava Account ID](https://support.kochava.com/reference-information/kochava-privacy-request/) and [App GUID](https://support.kochava.com/reference-information/locating-an-app-guid/) from your Kochava app. 


If you can't find the information, contact your partner account representative.

## Step 2: Activate DSR for Erasure Forwarding

1. From your mParticle workspace, open **Setup > Outputs** and select the **Data Subject Requests** tab.
2. Click **Add Data Subject Request**.
3. Choose a partner.
4. In the Data Subject Request dialog, add a **Configuration Name** and the access credential values you obtained in the previous section.
5. When you are ready, set **Forwarding Status** to **Active**.
6. Select **I understand** after reading the DSR forwarding disclaimer.

## Step 3: Submit Requests for Erasure

After the DSR forwarding is configured, use either the mParticle user interface or API to submit requests for erasure.

* [Instructions for the user interface](/guides/data-subject-requests/#erasure)
* [Instructions for the API](/developers/dsr-api/#submit-a-data-subject-request-dsr)

### DSR Forwarding Considerations

Before you forward DSR for erasure, consider the following:

* To avoid profile resolution complexities and subsequent conflation of user data deletion downstream, only a single profile is resolved. All other identities known for the resolved user profile are enriched onto the user deletion message sent downstream.
* When using the API or user interface, only a single identity of the same identity type is allowed when DSR for erasure forwarding has been enabled, such as a single customer ID, email address, or IDFA. You can send in multiple identities of different types such as Customer ID and email address. See [API error messages](#api-error-messages) for ID validation rules.
* To forward DSR for erasure for multiple user profiles, send one erasure request per user profile.
* mParticle forwards erasure requests on receipt of the request. The general processing time specified in [General Request Workflow](/guides/data-subject-requests/#general-request-workflow) only applies to the mParticle fulfillment processing and does not apply to DSR for erasure forwarding. 
* Once forwarded, mParticle can't guarantee that data is deleted by the partner. You can confirm with the partner that the request has been fulfilled.
* Different partners have different support IDs and distribution frequencies:

    | Partner | Supported IDs | Distribution Frequency |
    | :------ | :------------ | :--------------------- | 
    | [Amplitude](https://developers.amplitude.com/docs/user-deletion#deletion-job) | `User_id` (mapped from **user identification** dropdown in Amplitude's setup configuration | Once an hour or every 1000 messages, with a max of 100 messages in each upload  |
    | [Blueshift](https://developer.blueshift.com/reference/post_api-v1-customers-delete) | [`customer_id`, `email`](https://help.amplitude.com/hc/en-us/articles/360058073772#view-and-edit-your-project-information) | Immediate |
    | [Braze](https://www.braze.com/docs/api/endpoints/user_data/external_id_migration/) | `external_id` | Once an hour or every 1000 messages, with a max of 50 messages in each upload |
    | [Kochava](https://support.kochava.com/reference-information/kochava-privacy-request/) | IDFA (iOS Advertising ID) and ADID (Android Advertising ID) | Once an hour or every 10,000 messages|

//TODO: For Braze, do we mean `external_id` or "The mParticle User Identity type to forward as an External ID"? per https://www.braze.com/docs/partners/data_and_infrastructure_agility/customer_data_platform/mParticle/mparticle/#2-complete-mparticles-braze-event-kit-integration

Other partners are not yet supported. Work with each partner directly to manage user data deletion.

## Step 4: Check Forwarding Status

To check forwarding status per partner, use the [`GET /requests/{RequestID}`](/developers/dsr-api#get-the-status-of-an-opendsr-request) resource. The status reported is for forwarding and does not indicate fulfillment status from the partner.

**Example Response Body: Success**

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

The `extensions` element is a collection of information on the current state of sending the distribution request per partner.  The fields are:

| Field Name| Data Type	| Description |
| --- | ---	| --- |
| `domain` | string | The domain of the partner.
| `name` | string | The name entered when configuring the DSR configuration for the partner.
| `status` | string | The current status of the distribution to the partner - see [Status Definitions](/guides/data-subject-requests/forwarding/#check-forwarding-status).
| `status_message` | string |  Additional details for the `skipped` and `failed` status.

The `status` values and definitions returned in `extensions` vary depending on the integration partner.

**Blueshift**

| Status | Description |
| :--- | :--- |
| `pending` | The request has been queued for forwarding. |
| `skipped` | Request was not forwarded due to missing identities. |
| `sent` | The request has been forwarded. |
| `failed` | The request could not be sent, possible reasons are invalid credentials, partner API errors.  |

**Kochava**

| Status | Status Message | Description |
| :--- | :--- | :--- |
| `in_progress` |   | The request has been queued for forwarding.  |
| `skipped` | `No matching identities available. KochavaForwarder only supports Google Advertising ID, iOS Advertising ID.` | Request was not forwarded to Blueshift due to missing data. |
| `failed` |  `Received a 'BadRequest' response from Kochava. The request cannot be retried.`  | While attempting to send a request to Kochava, an error occurred. 
  |
| `completed` | `Upload completed successfully` | The request has been forwarded to Kochava.  |

**Amplitude**

| Status | Description |
| :--- | :--- |
| `pending` | ??? |
| `skipped` | ??? |
| `sent` | ??? |
| `failed` | ???  |

//TODO: Is this the right list? 

**Braze**

| Status | Description |
| :--- | :--- |
| `pending` | ??? |
| `skipped` | ??? |
| `sent` | ??? |
| `failed` | ???  |

//TODO: Is this the right list?

**Example Response Body: Error**

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

### API Error Messages

If you have enabled DSR for erasure forwarding, additional identity validation is performed which may result in an HTTP 400 status code response. Details contained in the `message` explain the cause:

* More than one `mpid` is provided.
* More than one identity of the same type is provided in the subject identities.
* More than one identity of the same type is provided in the extensions.
* An `mpid` is provided and additional identities are present.
* The same identity type is provided in subject identities and in the extensions.

### Callbacks

API callback info can be found in the [Data Subject Request API](/developers/dsr-api#callbacks).  To support erasure, an `extensions` element is included.  The format of the `extensions` element is the same as in the [distribution status](/guides/data-subject-requests/distribution/#check-distribution-status).

**Example Callback Request**

~~~http
POST /opendsr/callbacks HTTP/1.1
Host: opendsr.mparticle.com
Content Type: application/json
X-OpenDSR-Processor-Domain: opendsr.mparticle.com
X-OpenDSR-Signature:
P7f3LwgHVcDt8/26hziIGx56oVWGonkt6od7AY1VQBLsnIeh0K/z55GDmlrB7rbfd05RGUqqgjw4tekA3gjmABSwzEUFNAuAE2KNgNHcxzxzHBb9b0Nc/PBUAVKXHgY2Q6c7W0XKMOF5dLO67HUimtl2lJPZ10Y26uEd1ePkcUc5B/4likkd+kQQq7X6S6+GD20S1211NQ5+Xqk1WG2yxUryTHhovEblAuirOI4S/q03k5cmy0r0RuGzku0gNF5lMHJC6uRNXXisldcFpPJwTCGzJBbvkGCBmKPKfKV7cETFEayygi6GshimVnnQOsa4owvkWvze3ACd5DcNCfPrYw==
{
    "controller_id":"4308",
    "expected_completion_time":"2018-05-31T16:27:28.679094",
    "subject_request_id":"372fcd8b-d723-452e-ac60-36bd17372321",
    "request_status":"pending",
    "api_version":"2.0",
    "results_url":null,
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

## Step 5: Verify Partner Fulfillment

Once forwarded, mParticle cannot guarantee that data is deleted from your outputs. Always confirm that each partner fulfills the request.

* **Blueshift**

    You can search for a particular user under customers> Attributes from the global left navigation. Before you delete the user, you should find search results referencing that user. After you delete the user, search results don't return any results related to that user.

    If you are looking to automate testing, you can leverage the Blueshift search endpoint: https://developer.blueshift.com/reference#get_api-v1-customers.

* **Kochava**
  
    ?

* **Amplitude**
  
    ?

* **Braze**

    ?
