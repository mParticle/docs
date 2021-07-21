---
title: Feed
---

[Airship](https://www.airship.com/) provides push messaging services, including segmentation and targeting capabilities.

## Enable the Integration

The Airship integration supports the following inputs: iOS, Android, Web, and Unbound. If you want to capture data for multiple platforms, you must configure one instance of the feed for each platform in mParticle.  Airship uses their [Real-time Data Streaming API](https://docs.airship.com/api/connect/) and translates the data from Airship format to mParticle [JSON](/developers/server/json-reference).

NOTE:  The integration maps Airship channels to mParticle platforms. For example, you set iOS in the Airship RTDS configuration page to map to iOS on the mParticle platform. iOS, Android, and Web have direct matches on the mParticle’s side. Airship email and SMS data are sent as Unbound data to mParticle. Another option is to configure all Airship data to be sent as unbound traffic. In this case, you will not select a platform in the mParticle configuration.

### mParticle setup

The Airship feed supports "act as" functionality, which means it acts like data is received from native platform inputs (i.e. iOS, Android, Web).  Create a different configuration for each input including the unbound input specifying different names, platform.  mParticle will generate a Server-to-server Key and Secret for each configuration.

1. Click on the Airship tile from the directory and select the Feed option, or Click on Setup » Inputs » Feeds and click the plus button to create a configuration.
3. Enter a unique name in the Configuration Name field.
4. Select the appropriate option from the list in the Platform field: iOS, Android, or Web. For the Unbound feed, leave this field unselected.
5. Click Save to complete your setup.
6. Copy the Server to Server Key/Secret for setup in Airship.

### Airship setup

For each created input, mParticle will provide a Server to Server Key and Secret. Copy these credentials for [Airship setup](https://docs.airship.com/partners/mparticle/#mparticle-setup), making sure to note which feed each pair of credentials is for. For each platform that you want to set up, complete the following steps:

1. In Airship, go to Settings » Real-Time Data Streaming, click mParticle and enter a name and description.
2. Choose an mParticle environment and an mParticle Data Center.
3. Configure platforms with Server to Server Keys and Secrets copied from mParticle.
4. In the User Identity Type field, select Customer ID. You may also select Other if you prefer
users to be identified by their device IDs – either Identifier for Vendor (IDFV) or Google
Advertising ID (AAID).
5. Select the event types that you want to send to mParticle.
6. Click Activate to complete the configuration.
