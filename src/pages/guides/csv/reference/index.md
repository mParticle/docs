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

Use the public encryption key corresponding to your pod:

* [US1](#us1)
* [EU1](#eu1)
* [AU1](#au1)
* [US2](#us2)

### US1

```
-----BEGIN PGP PUBLIC KEY BLOCK-----

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
biYBg8JUhwlni9dnp6i9QBTow2tH
=NeON
-----END PGP PUBLIC KEY BLOCK-----
```

### EU1

```
-----BEGIN PGP PUBLIC KEY BLOCK-----

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
dQATUJ6kLZN+1GYh/QAcsaYA5pOMwpoWVNEk
=1Fyv
-----END PGP PUBLIC KEY BLOCK-----
```

### AU1

```
-----BEGIN PGP PUBLIC KEY BLOCK-----

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
LsQi0iohuZYYvCY+QJXPIJAphrX3NyiMkoVH
=0+xD
-----END PGP PUBLIC KEY BLOCK-----
```
### US2

```
-----BEGIN PGP PUBLIC KEY BLOCK-----

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
qzUi2ZFg6AeVYz+3h51NrsNFWCu6uAsrdL4v
=HgCt
-----END PGP PUBLIC KEY BLOCK-----
```

## Sensitive data

Use the following public encryption key for sending sensitive data.

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
