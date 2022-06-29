---
title: Audience
---

Google Cloud Storage provides a file storage web service for developers and enterprises that combines the performance and scalability of Google’s cloud with geo-redundancy, advanced security and sharing capabilities.

## Supported Features

* Audience Forwarding

## Prerequisites

To activate your Google Cloud Storage integration, you will need an active Google Service Account. 

Create a Bucket in your account to store your mParticle data and grant `Storage Object Creator` to `mparticle-gcp-clientfacing@gcp-prod-170221.iam.gserviceaccount.com`. This allows mParticle to create files in your bucket.

Optionally, you can create a folder in your bucket to store your mParticle data. This is useful if you are storing other data in the same bucket, or if you want to separate dev and production data without creating two buckets. If you want to store your data in a folder, you must provide the name of the folder in the Connection Settings dialog.

## Uploading Data

mParticle audience membership updates to GCS are handled in batch.  
- The batch upload trigger is file-size-based or time-based, whichever criteria is met first.  
- Those thresholds are currently set as 1GB and 3 hours, respectively.  
- The data delivered to GCS is the delta of users added/removed from an audience since the previous upload, not a full snapshot of the audience.  
- The size of the files that are sent to GCS will be no larger than 512 MB.  For example, if the bulk forwarder is triggered and there's 600 MB of data, the forwarder will split that into multiple files of < 512MB each.

### File structure

Files will consist of individual JSON records delimited by new-lines.

Example of an individual record:
`{"IsAddRequest":true,"IdentityValues":{"customer_id":"some_id","mpid":"1"},"MembershipChangedTimestamp":1594167374230}`

### File Names

An uploaded file's name will be structured as follows.
`[Audience Name]_[Audience ID]_[Date]_[Time]_[GUID].txt`

Ex:
`Test-Audience_1234_2020-01-01_00-00-00_721e1d63-a396-4676-bac2-3f6f31e88cc2.txt`

**NOTE:** All spaces in Audience names are replaced with hypens.

## Identities

By default, Google Cloud Storage will forward all available Device and User identities for a given user. However, you can individually set which of these are excluded in the Connection Settings dialog.

## Validation

Upon saving a new audience subscription, mParticle will attempt to upload an empty file called `mparticle-validation-[time stamp].txt` to the bucket and folder to verify it is configured correctly. In order to guarantee the file name is unique we add the time stamp to it. This will generate a new file every time you save the audience subscription.

If there is any error in the subscription settings, the connection won't be saved, and an error message will be displayed.

## Deleting an Audience

mParticle doesn't delete the downstream audience when you delete an audience in mParticle.

## Connection Settings

| Setting Name | Data Type | Default Value | Description |
| --- | --- | --- | --- | --- |
| Storage Bucket Name | `string` | <unset> | The name of the storage bucket to which mParticle will forward audience data. |
| Folder Name | `string` | <unset> | An optional name of a folder in the storage bucket in which to store audience data. If not set, files will simply be uploaded directly under the bucket. |
| Identities to Exclude | `List` | <unset> | An optional setting allowing one to indicate which user and device identities to exclude in outgoing data.
| Include Audience Deletes | `bool` | False | If checked, mParticle will process audience membership removal. Otherwise, these requests will be skipped. |
