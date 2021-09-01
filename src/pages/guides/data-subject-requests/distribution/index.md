---
title: DSR Distributions for Erasure
---

You can configure mParticle to distribute Data Subject Requests (DSRs) for erasure to a number of supported partners. Once forwarded, mParticle can't guarantee that data is deleted from your outputs, so confirm that each partner fulfills the request.

| **Note:** Data subject request (DSR) distribution is available in limited access. |
|---|

# Supported Partners

You can distribute DSRs for erasure in outputs to the following partners:

| Partner | Supported IDs | Distribution Frequency | Details |
| :------ | :------------ | :--------------------- | :------ |
| Kochava | IDFA (iOS Advertising ID) and ADID (Android Advertising ID) | Once an hour or every 10,000 messages| [Learn more about partner's user-data deletion processing](https://support.kochava.com/reference-information/kochava-privacy-request/) 
| Blueshift | email | Immediate | [Learn more about partner's user-data deletion processing](https://developer.blueshift.com/reference#post_api-v1-customers-delete) |

For outputs currently not supported, work with each partner separately to manage user data deletion.

# Create a DSR Distribution

To create a DSR distribution:

1. [Obtain access credentials for each partner](#obtain-partner-access-credentials).
2. [Configure and activate the DSR distribution](#create-and-activate-the-dsr-distribution).
3. [Submit DSR distributions for erasure using the UI or API](#submit-dsr-distributions).
4. [Verify that each partner has fulfilled the request](#verify-partner-fulfillment).

## Obtain Partner Access Credentials

Collect the partner's credential information to use in the next step:

* For Blueshift, copy [the Users API key](https://developer.blueshift.com/reference#authorization-1). You must be a Blueshift admin user to see this information.

* For Kochava, obtain [the Kochava Account ID](https://support.kochava.com/reference-information/kochava-privacy-request/) and [App GUID](https://support.kochava.com/reference-information/locating-an-app-guid/) from your Kochava app. 
  
If you can't find the information, contact your partner account representative.

## Create and Activate the DSR Distribution

1. From your mParticle workspace, open **Setup > Output**.
2. Click **Add Data Subject Request Output**.
3. Choose an output partner.
4. In the Data Subject Request dialog, add a **Configuration Name** and the access credential values you obtained in the previous section.
5. When you are ready, set **Distribution Status** to **Active**.
6. Select **I understand** after reading the DSR Distribution disclaimer.

![Image of Data Subject Request dialog](/images/dsr/dsr-dialog.png)

## Submit DSR Distributions

After the DSR distribution is configured, use either the mParticle user interface or APIs to submit DSR distributions.

* [Instructions for the user interface](https://docs.mparticle.com/guides/data-subject-requests/#erasure)
* [Instructions for the API](https://docs.mparticle.com/developers/dsr-api/#submit-a-data-subject-request-dsr)

<!-- TODO: Change two links above to indirect references before publishing as exposed in left nav. -->

### DSR Distribution Considerations

Before you submit a DSR distribution, consider the following:

* To avoid profile resolution complexities and subsequent conflation of user data deletion downstream, only a single profile will be resolved. All other identities known for the resolved user profile will be enriched onto the user deletion message sent downstream.
* When using the API or user interface, only a single identity of the same identity type is allowed when DSR distribution has been enabled. For example, a single customer ID, email address, IDFA. You can send in multiple identities of different types such as Customer ID and email address. See [API error messages](#api-error-messages) for ID validation rules.
* To distribute DSR deletion for multiple user profiles, send one erasure request per user profile.
* mParticle forwards erasure requests on receipt of the request. The general processing time specified in [the General Request Workflow](https://docs.mparticle.com/guides/data-subject-requests/#general-request-workflow) only applies to the mParticle fulfillment processing and does not apply to DSR distribution. 

### Check Distribution Status

To check distribution status per partner, use the [`GET /requests/{RequestID}`](https://docs.mparticle.com/developers/dsr-api#get-the-status-of-an-opendsr-request) resource. The status reported is for distribution and does not indicate fulfillment status from the partner.

Example Response Body

```
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
                    "status": "in_progress",
                    "status_message": null
                },
                {
                    "domain": "blueshift.com",
                    "name": "Blueshift DSR Federation",
                    "status": "in_progress",
                    "status_message": null
                }
            ]
        }
    }
}
```

## Verify Partner Fulfillment

Once forwarded, mParticle cannot guarantee that data is deleted from your outputs. Always confirm that each partner fulfills the request.

### Blueshift
You can search for a particular user under customers> Attributes from the global left navigation. Before you delete the user, that should appear in the search result. Once you delete the user, that user will not appear in the search.

If you are looking to automate the testing, you can leverage Blueshift's [search endpoint.](https://developer.blueshift.com/reference#get_api-v1-customers)

<!-- TODO: How do they do this? -->

## DSR Distribution Status Definitions

### Blueshift

| Status | Status Message | Description |
| :--- | :--- | :--- |
| `in_progress` |  |  |
| `skipped` | `No matching identities available.` | Request was not forwarded to Blueshift due to missing data. |
| `failed` | `Received an 'Unauthorized' response from Blueshift. Check the API key specified in your Blueshift configuration` | While attempting to send a request to Blueshift, an error occurred.   |
| `completed` | `Upload completed successfully` | The request has been forwarded to Blueshift  |

### Kochava

| Status | Status Message | Description |
| :--- | :--- | :--- |
| `in_progress` |   | The request has been queued for forwarding.  |
| `skipped` | `No matching identities available. KochavaForwarder only supports Google Advertising ID, iOS Advertising ID.` | Request was not forwarded to Blueshift due to missing data. |
| `failed` |  `Received a 'BadRequest' response from Kochava. The request cannot be retried.`  | While attempting to send a request to Kochava, an error occurred. 
| `completed` | `Upload completed successfully` | The request has been forwarded to Kochava.  |


## API Error Messages

API error messages related to ID validation rules:

More than one `mpid` is provided:

   ```Only one mpid per request is allowed when request distribution is enabled. Please check the 'mpids' collection in the extensions.```

More than one identity of the same type is provided in the subject identities:

   ```Only one identity per identity type is allowed when request distribution is enabled. Please check the 'subject_identities' collection.```

More than one identity of the same type is provided in the extensions:

   ```Only one identity per identity type is allowed when request distribution is enabled. Please check the 'identities' collection in the extensions.```

An `mpid` is provided and additional identities are present:

   ```If an mpid is provided, it must be the only identity in the request when distribution is enabled.```

The same identity type is provided in subject identities and in the extensions:

   ```Only one identity per identity type is allowed when request distribution is enabled. Please check the 'subject_identities' collection and 'identities' collection in the extensions.```
