---
title: Forwarding Data Subject Requests
---

You can create an output to Amplitude that forwards data subject requests for erasure.

Before you configure Amplitude to forward data subject requests, be aware of the following:

* To avoid profile resolution complexities and subsequent conflation of user data deletion downstream, only a single user profile is resolved. All other identities associated with the resolved user profile are included in the user deletion message sent to downstream partners.
* When using the API or user interface, only a single identity of the same identity type is allowed when DSR for erasure forwarding has been enabled, such as a single customer ID, email address, or IDFA. You can send in multiple identities of different types such as Customer ID and email address. See [API error messages](#api-error-messages) for ID validation rules.
* To forward DSR for erasure for multiple user profiles, send one erasure request per user profile.
* mParticle forwards erasure requests on receipt of the request. The general processing time specified in [General Request Workflow](/guides/data-subject-requests/#general-request-workflow) only applies to the mParticle fulfillment processing and does not apply to DSR for erasure forwarding. 
* Once forwarded, mParticle can't guarantee that data is deleted by the partner. You can confirm with the partner that the request has been fulfilled.

To forward data subject requests to Amplitude, use the following process.

## Step 1: Obtain Amplitude Access Credentials

Obtain [the API key, Secret Key, and Data Center](https://help.amplitude.com/hc/en-us/articles/360058073772#view-and-edit-your-project-information) for your project. 

If you can't find the information, contact your Amplitude account representative.

## Step 2: Create and Activate a DSR Output

Create a DSR forwarding configuration for Amplitude and activate it:

1. From your mParticle workspace, open **Setup > Outputs** and select the **Data Subject Requests** tab.
2. Click **Add Data Subject Request**.
3. Choose Amplitude.
4. In the Data Subject Request dialog:

    a. Add a DSR output **Configuration Name**.

    b. Add the **API Key** and **Secret Key** you obtained in Step 1.

    c. Select a **User Identification** value. You should generally use same User Identity type you used to set up your Amplitude event output configuration. The [Amplitude endpoint](https://developers.amplitude.com/docs/user-deletion#deletion-job) accepts an mParticle User Identity type to forward as the User Identification.

    d. Select the **Region** of your Amplitude account that you obtained earlier in Step 1.
    
5. Save the configuration with the default **Inactive** or, if you are ready, set **Forwarding Status** to **Active**.  Once the status has been set to Active, erasure requests are forwarded to Amplitude once an hour or every 1000 messages, with a max of 100 messages in each upload.
6. Select **I understand** after reading the disclaimer.

<aside> From Setup > Outputs, you can also check the status of a DSR output configuration or delete it. To modify an existing configuration, click anywhere in the bar that contains the configuration name.</aside>

## Step 3: Submit Requests for Erasure

After the DSR forwarding is configured, use either the mParticle user interface or API to submit requests for erasure.

* [Instructions for the user interface](/guides/data-subject-requests/#erasure)
* [Instructions for the API](/developers/dsr-api/v3/#submit-a-data-subject-request-dsr) You must use v3 of the API with DSR.
  
<aside>Remember to set the configuration to Active (Step 2.5) to start forwarding erasure requests.</aside>

## Step 4: Check Forwarding Status

You can check distribution status in the mParticle UI or using v3 of the mParticle DSR API.

### Check Status With UI

To check status, visit **Privacy > Data Subject Requests**.

To see more detail, click the request ID. 

### Check Status With API

To check forwarding status per partner, use the [`GET /requests/{RequestID}`](/developers/dsr-api/v3/#get-the-status-of-an-opendsr-request) resource. The status reported is for forwarding and does not indicate fulfillment status from the partner.

See [Data Subject Request API](/developers/dsr-api#callbacks) for information about API callbacks and the `extensions` element that supports erasure.

## Step 5: Verify Partner Fulfillment

Once forwarded, mParticle cannot guarantee that data is deleted from your outputs. Always confirm that each partner fulfills the request. 