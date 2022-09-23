---
title: CSV File Reference
order: 2
---

This topic contains reference information and instructions for advanced techniques when importing data using CSV files.

## Configuration Settings

<!-- Where are these values set? Shouldn't we have a step in the instructions? Is this optional? -->

| Configuration Name | Data Type | Default | Description |
| :----------------- | :-------- | :------ | :---------- |
| Setting Name |  string |   | If the event type is custom event, and every row in your file has the same event name, specify the name for all events. If also set in column `events.data.event_name`, the data in the file takes precedence. |
| Custom Event Type | string |   | If Event Type is Custom Event, and every row in your file is the same Event Type, use this to set the Type for all events. If also set in `events.data.custom_event_type`, the data in the file takes precedence.|
| Custom Manifest | string |  | To override the default format, include [a custom manifest](#use-a-custom-manifest). | 
| Expect Encrypted Files | Boolean | `false` | Only encrypted OR unencrypted files can be accepted, but not both.  You must use PGP encryption with mParticle’s public key.  See [Drop encrypted files](#drop-encrypted-files) |

## Use a custom manifest 

A custom manifest allows you to use files created by other systems without transformation. In the mParticle UI, when you’re configuring the Custom CSV input, you can provide a JSON manifest to describe how you want to map your CSV data to mParticle’s fields in one of two ways:

* With a header row: Map your column names to mParticle’s column names.
* Without a header row:  Map your columns, which must appear in a specific order, to mParticle’s column names.

In order to guarantee that the new/changed manifest applies to your CSV files, please ensure a gap of about 5 minutes between the manifest change and uploading CSV files.

### With a header row

If your CSV has a header row, you can map the column names in your header directly to mParticle fields. The manifest must set `"hasHeaderRow": true` and contain an array of columns objects, each giving a column name, an action (`"keep"` or `"ignore"`) and a target mParticle field. The order of entries in the column array doesn't need to match the order of columns in the CSV file.

Example with a header row

Assume that you drop the following manifest on the SFTP server:

```json
{
  "hasHeaderRow": true, // required
  "columns": [
    {
      "column": "Event Name",
      "action": "keep",
      "field": "events.data.event_name"
    },
    {
      "column": "Custom Type",
      "action": "keep",
      "field": "events.data.custom_event_type"
    },
    {
      "column": "Email",
      "action": "keep",
      "field": "user_identities.email"
    },
    {
      "column": "Facebook",
      "action": "ignore",
      "field": "user_identities.facebook"
    },
    {
      "column": "Home City",
      "action": "keep",
      "field": "user_attributes.$city"
    },
    {
      "column": "Category",
      "action": "keep",
      "field": "events.data.custom_attributes.category"
    },
    {
      "column": "Destination",
      "action": "keep",
      "field": "events.data.custom_attributes.destination"
    },
    {
      "column": "Time",
      "action": "keep",
      "field": "events.timestamp_unixtime_ms"
    },
    {
      "column": "Environment",
      "action": "keep",
      "field": "environment"
    }
  ]
}
```

Then assume that you drop a CSV file with the following header row and one row of data:

``Event Name,Custom Type,Email,Facebook,Home City,Category,Destination,Time,Environment``
``Viewed Video,other,h.jekyll.md@example.com,h.jekyll.md,London,Destination Intro,Paris,1466456299032,development``

The resulting batch will be:

```json
{
    "events" :
    [
        {
            "data" : {
                "event_name": "Viewed Video",
                "custom_event_type": "other",
                "custom_attributes": {
                    "category": "Destination Intro"
                    "destination": "Paris"                   
                },
                "timestamp_unixtime_ms": "1466456299032"
            },
            "event_type" : "custom_event"
        }
    ],
    "user_attributes" : {
        "$city": "London"
    },
    "user_identities" : {
        "email": "h.jekyll.md@example.com"
    },
    "environment" : "development"
}
```

### Without a header row

If your CSV does not have a header row, you can map columns to mParticle fields by the order they appear in the CSV. 

The manifest must include `"hasHeaderRow": false` and contain an array of columns objects, each giving an action (`"keep"` or `"ignore"`) and a target mParticle field. For this method to work, you must be able to guarantee the same column order in each CSV file you upload. 

The following is an example of the same custom manifest as the previous example, but without a header row:

```json
{
    "hasHeaderRow": false, //THIS IS REQUIRED 
    "columns": [{
   		 "action": "keep",
   		 "field": "events.data.event_name"
   	 },
   	 {
   		 "action": "keep",
   		 "field": "events.data.custom_event_type"
   	 },
   	 {
   		 "action": "keep",
   		 "field": "user_identities.email"
   	 },
   	 {
   		 "action": "ignore",
   		 "field": "user_identities.facebook"
   	 },
   	 {
   		 "action": "keep",
   		 "field": "user_attributes.$city"
   	 },
   	 {
   		 "action": "keep",
   		 "field": "events.data.custom_attributes.category"
   	 },
   	 {
   		 "action": "keep",
   		 "field": "events.data.custom_attributes.destination"
   	 },
   	 {
   		 "action": "keep",
   		 "field": "timestamp_unixtime_ms"
   	 },
   	 {
   		 "action": "keep",
   		 "field": "environment"
   	 }
    ]
}
```

## Encrypted files

The Custom CSV Feed can accept files encrypted with PGP, using mParticle’s Public Key. You can use software like GPG Tools for OS X or Windows. Never use web-based tools to encrypt, hash, or encode data.

To enable encryption, set the configuration setting **Expect Encrypted Files** to `true`.

<aside> <b>Warning:</b> If encryption is enabled on a configuration, all files in that configuration are expected to be encrypted. Likewise, if a configuration is set as not encrypted, all files are expected to be non-encrypted. Mixing encrypted and non-encrypted data causes an error.</aside>

It's most efficient to send multiple files in a zipped, or gzipped format. Encrypt the final ZIP file instead of each individual file.

Use the following public encryption key for uploading files.

```
-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: GnuPG v2
mQENBFRKgRIBCACXmtK5WGdBDk/JWqzYdCd8uiKPJrnY0cAqfM6Rv1IhAl38IRKz
9rsfcK1z3bIZYGwfOk1SPBZmSxLERF1DgwhhInrXf+OojxGiRmMRK7QQ1zE/sqvW
RZqPeP+fRquK8BTP37Q+h8aophWBqaVfpejAaJtC+Xqe2xeGvBpnA8wu1c+Z1mLg
UfuKfRcadHQ1Ej99kWpIHyXh0D83yV1HbG0Gh8x0USKYiLK0Nn0ykVyAB9mk0GjF
3RoynGNHrbn3CH3f0J6ib+u7aVcZ9Y+E0E8KSI4h/4WhpIEWwicolMNeA+mTfySy
HKOUGkGy0k6+ltrA1H9ti/nmBkR9brJKP/7pABEBAAG0I05heWRlbiBLb2xldiA8
bmtvbGV2QG1wYXJ0aWNsZS5jb20+iQE5BBMBAgAjBQJUSoESAhsPBwsJCAcDAgEG
FQgCCQoLBBYCAwECHgECF4AACgkQK48THX7ssvDsVQf/XZRuWWme2NvxSa+Ce/hB
E6jIVLu5mw/snVo7PuGYRT0SoCRjEgx4J7tsmVlraRzBWAYYLdNd0pLAdkF+8rrh
9klxbDAIuXE1KlyjXIifVQZH6I9Ujnnx+IZd+Ev/+FBLDBaEpcQSN1fEvI+MIotp
9Q/7N+uts7DFFt1z7W/L9v0ujf4/t/L8DjYKm3AK+1DpbTlMt31YHoAuCs165pi/
ZSy61BJM1N1XKAUPR7bcUw+ahhlMF7b3nyVQppmasqUdVLKTApCICX6yjooj0RDV
0xcCNATCQJw/X7kL30Svi1C9oUro0KbRKa9O2ObODfBLt+XcrIqOxBwOcHzIg0bv
Gw===fzFR
-----END PGP PUBLIC KEY BLOCK-----
```

## Processing speed

For files within recommended size limits, processing speed is consistent with the Events API: about 270 rows per second. To increase the processing speed for your CSV feed, contact [mParticle Support](https://support.mparticle.com/).

## Processing Behavior

* Files aren't guaranteed to be processed in sequence; files are not linked to one another. Each file is independent and there's no way to indicate if two files were split from a master file.
* You can observe how much data has been processed using Data Master and your outbound connections. There is no notification.
* Once dropped, files start processing at any time. Deleting a file from the dropped folder is not a guarantee that it won't be processed. Overwriting files can lead to partial or incomplete imports, or other errors may occur.
* Rows may be batched together for processing. Thus, there may be fewer processed batches than rows.
The only fields not considered unique identifiers for batching are event-specific, such as event name, custom event attributes, and the batch-level timestamp. If two rows have the exact same set of attributes and identifiers otherwise, then they may be batched together for processing.
* Each file is processed beginning to end. A file is never split or read asynchronously.
Header mappings are on a per-configuration basis and are applied to all potential files (if their headers are not valid already). There is no way to associate a mapping with either a filename or filename pattern.
* Processed files are deleted within 30 days.
