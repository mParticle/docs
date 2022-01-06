---
title: Forwarding Data Subject Requests for Erasure
---

You can configure mParticle to forward Data Subject Requests (DSRs) for erasure to a number of supported partners. Once forwarded, mParticle can't guarantee that data is deleted by the partner, so confirm that each partner fulfills the request.

<aside class="notice">Data subject request (DSR) forwarding is a closed Beta release.</aside>

You can distribute DSRs for erasure to the following partners.  Click on the partner name to get details of their erasure APIs.

To forward DSRs for erasure:

1. [Obtain access credentials for each partner](#step-1-obtain-partner-access-credentials).
2. [Create and activate a data subject request output](#step-2-create-and-activate-a-dsr-output).
3. [Submit DSR for erasure using the UI or API](#step-3-submit-requests-for-erasure).
4. [Check forwarding status](#step-4-check-forwarding-status).
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

## Step 2: Create and Activate a DSR Output

Create a DSR forwarding configuration for a partner and activate it:

1. From your mParticle workspace, open **Setup > Outputs** and select the **Data Subject Requests** tab.
2. Click **Add Data Subject Request**.
3. Choose a partner.
4. In the Data Subject Request dialog, add a **Configuration Name** and the access credential values you obtained in the previous section.
5. When you are ready, set **Forwarding Status** to **Active**.
6. Select **I understand** after reading the disclaimer.

![DSR user interface](/images/dsr/data-subject-request.gif)

You can also check the status of a DSR output, or delete it.

## Step 3: Submit Requests for Erasure

After the DSR forwarding is configured, use either the mParticle user interface or API to submit requests for erasure.

* [Instructions for the user interface](/guides/data-subject-requests/#erasure)
* [Instructions for the API](/developers/dsr-api/#submit-a-data-subject-request-dsr) You must use v3 of the API with DSR.

### DSR Forwarding Considerations

Before you forward DSR for erasure, consider the following:

* To avoid profile resolution complexities and subsequent conflation of user data deletion downstream, only a single user profile is resolved. All other identities associated with the resolved user profile are included in the user deletion message sent to downstream partners.
* When using the API or user interface, only a single identity of the same identity type is allowed when DSR for erasure forwarding has been enabled, such as a single customer ID, email address, or IDFA. You can send in multiple identities of different types such as Customer ID and email address. See [API error messages](#api-error-messages) for ID validation rules.
* To forward DSR for erasure for multiple user profiles, send one erasure request per user profile.
* mParticle forwards erasure requests on receipt of the request. The general processing time specified in [General Request Workflow](/guides/data-subject-requests/#general-request-workflow) only applies to the mParticle fulfillment processing and does not apply to DSR for erasure forwarding. 
* Once forwarded, mParticle can't guarantee that data is deleted by the partner. You can confirm with the partner that the request has been fulfilled.
* Different partners have different support IDs and distribution frequencies:

    | Partner | Supported IDs | Distribution Frequency |
    | :------ | :------------ | :--------------------- | 
    | [Amplitude](https://developers.amplitude.com/docs/user-deletion#deletion-job) | `User_id` (mapped from **user identification** dropdown in Amplitude's setup configuration | Once an hour or every 1000 messages, with a max of 100 messages in each upload  |
    | [Blueshift](https://developer.blueshift.com/reference/post_api-v1-customers-delete) | [`customer_id`, `email`](https://help.amplitude.com/hc/en-us/articles/360058073772#view-and-edit-your-project-information) | Immediate |
    | [Braze](https://www.braze.com/docs/api/endpoints/user_data/external_id_migration/) | [External Identity type](https://www.braze.com/docs/partners/data_and_infrastructure_agility/customer_data_platform/mParticle/mparticle/#2-complete-mparticles-braze-event-kit-integration) | Once an hour or every 1000 messages, with a max of 50 messages in each upload |
    | [Kochava](https://support.kochava.com/reference-information/kochava-privacy-request/) | IDFA (iOS Advertising ID) and ADID (Android Advertising ID) | Once an hour or every 10,000 messages|

Other partners are not yet supported. Work with each partner directly to manage user data deletion.

## Step 4: Check Forwarding Status

You can check distribution status in the UI or using v3 of the API.

### Check Status With UI

To check status, visit **Privacy > Data Subject Requests**.

![List of data subject requests](/images/data-privacy-controls/dsr-list.png)

To see more detail, click a request ID. 

### Check Status With API

To check forwarding status per partner, use the [`GET /requests/{RequestID}`](/developers/dsr-api#get-the-status-of-an-opendsr-request) resource. The status reported is for forwarding and does not indicate fulfillment status from the partner.

See [Data Subject Request API](/developers/dsr-api#callbacks) for information about API callbacks and the `extensions` element that supports erasure.

## Step 5: Verify Partner Fulfillment

Once forwarded, mParticle cannot guarantee that data is deleted from your outputs. Always confirm that each partner fulfills the request. 
