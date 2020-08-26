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

Audience membership updates are uploaded in files no larger than `512 MB`. Depending on the volume of data received over a given amount of time, it may take up to `3` hours for data to be reflected within Google Storage.

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

Upon saving a new audience subscription, mParticle will attempt to upload an empty file called `mparticle-validation.txt` to the bucket and folder to verify it is configured correctly.

If there is any error in the subscription settings, the connection won't be saved, and an error message will be displayed.

## Connection Settings

| Setting Name | Data Type | Default Value | Description |
| --- | --- | --- | --- | --- |
| Storage Bucket Name | `string` | <unset> | The name of the storage bucket to which mParticle will forward audience data. |
| Folder Name | `string` | <unset> | An optional name of a folder in the storage bucket in which to store audience data. If not set, files will simply be uploaded directly under the bucket. |
| Identities to Exclude | `List` | <unset> | An optional setting allowing one to indicate which user and device identities to exclude in outgoing data.
| Include Audience Deletes | `bool` | False | If checked, mParticle will process audience membership removal. Otherwise, these requests will be skipped. |