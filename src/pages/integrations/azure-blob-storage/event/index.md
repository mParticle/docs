---
title: Event
---

[Azure Blob Storage](https://azure.microsoft.com/en-us/services/storage/) is a storage service under Azure Cloud Platform. Azure Blob storage is Microsoft's object storage solution for the cloud. Blob storage is optimized for storing massive amounts of unstructured data, such as text or binary data.

## Prerequisites

## Event Data Format

### Blob Contents

The event data will be forwarded as plain text files containing new-line delimited JSON objects. The file cannot be parsed as JSON in its entirety. Instead, each line in the file will correspond with a single event batch formatted as a JSON object. Please refer to the mParticle [JSON](/developers/server/json-reference/) documentation for a detailed description of the data format used for each batch.

For example, if two batches are forwarded at once, the blob will contain something similar to the following (note some fields were removed for brevity):

~~~json
{"events":[{"data":{"event_name":"MyTestEvent","timestamp_unixtime_ms":"1595542763908","event_id":"1234"},"event_type":"custom_event"}],"user_identities":[{"identity_type":"customer_id","identity":"TestCustomerId1"}],"environment":"production"}
{"events":[{"data":{"event_name":"MyOtherTestEvent","timestamp_unixtime_ms":"1595543017730","event_id":"2345"},"event_type":"custom_event"}],"user_identities":[{"identity_type":"customer_id","identity":"TestCustomerId2"}],"environment":"production"}
~~~

### Blob and Folder Names

#### Blob Names

Each blob should be named using the following format:<br>
`<App Name>_<UTC timestamp set as message is forwarded>_<Random 5 digit number>.txt`.

For example: `mPTravel_20171017170911644493_34523.txt`.

#### Folder Names

Optionally, you can store blobs in a folder within your Azure container by providing a **Folder Name** in mParticle's Azure Blob Storage Integration [Connection Settings](#connection-settings).

<aside>
Note: mParticle will attempt to upload an empty file named <code>mparticle_validation.txt</code> when you save the settings for a connection to verify settings are correct. You can delete this file without issue, but note that it will be uploaded again if you change connection settings.
</aside>

#### Date-Based Folders

You can further organize blobs into date-based folders, with the name format:<br>
`YYYY-MM-DD`.

Files can be sorted into folders in several ways according to how you set **Store Data in Folders By Date** in the mParticle's Azure Blob Storage Integration [Connection Settings](#connection-settings):

* **None** - blobs will not be stored in date folders
* **Store data in folders by the event time** - each blob will be sorted into a folder according to the timestamp of the first event in the batch
* **Store data in folders by upload time** - each blob will be sorted into a folder according to the upload time of the batch
* **Store data in folders by first event time or upload time if no events** - each blob will be sorted into a folder according to the timestamp of the first event in the batch, or the upload time of the batch if there are no events

<aside>
Note that blobs will be sorted into folders depending on when when the events occurred, or were received by mParticle, but the blobs themselves are named according to the time the file is created. If there is a delay in forwarding, it is possible that the blob and folder timestamps will not match. Blob/folder timestamp mismatches do not indicate an error.
</aside>

## Configuration Settings

| Setting Name | Data Type | Default Value | Description |
| --- | --- | --- | --- |
| Account Name | `string` | <unset> | The name of your Azure Storage account. |
| Account Key | `string` | <unset> | One of the keys for your Azure Storage account. Microsoft recommends using the first key, but either may be used. |

## Connection Settings

| Setting Name | Data Type | Default Value | Platform | Description |
| --- | --- | --- | --- | --- |
| Blob Container Name | `string` | <unset> | All | The name of the Azure container that mParticle will use to store event data. |
| Folder Name | `string` | <unset> | All | An optional folder name in your Azure container to store the event data. |
| Store Data in folders by Date | `string` | None | All | If enabled, your data will be stored in a folder according to the chosen method. |
| Unique ID | `string` | <unset> | All | An optional string identifier for your app that will be forwarded with each event batch.  Standard app identifiers (Apple OS Bundle ID, Android Package Name) will be forwarded regardless of this setting. |
| Metadata Field Exclusion | Custom Field | <unset> | All | A way to exclude specific fields of metadata properties in the output. |
| Include Metadata | `bool` | True | All | If enabled, the following metadata - application_info, device_info and source_info will be forwarded. |
| Use Compression | `bool` | False | All | If enabled, data will be compressed in gzip format. |
| Include MP DeviceId | `bool` | False | All | If enabled, MP DeviceId (Device Application Stamp) will be forwarded with event batches. |
| Send as Batch | `bool` | True | All | If enabled, this setting will cause your app's events to be sent in (roughly) 10-minute batches per device.  If disabled, mParticle will send each event individually as it's received. |
| Send Batches without Events | `bool` | True | All | If enabled, an event batch that contains no events will be forwarded. |
| Include User Attribute Change Events | `bool` | False | All | If enabled, User Attribute Change Events will be forwarded. |
| Include User Identity Change Events | `bool` | False | All | If enabled, User Identity Change Events will be forwarded. |
