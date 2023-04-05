---
title: Import Data with CSV Files
order: 1
---

You can import bulk data, both user attribute and events, from your data warehouse or legacy system using comma separated values (CSV) files. You can use this technique in all regions and with all outputs.

<aside>This bulk data import tool is a Beta feature. Unless otherwise advised by mParticle, use it only for proof-of-concept projects assisted by your mParticle team. To use this feature, please submit a request with <a href="https://support.mparticle.com" target="_blank">mParticle Support</a>. Note that you will also need to contact mParticle to gain access to our SFTP server as described in the following steps.
</aside>

Use the following process to load user attribute or event data from CSV files:

- [1. Create CSV files](#1-create-csv-files)
  - [File guidelines](#file-guidelines)
  - [Data guidelines](#data-guidelines)
- [2. Get credentials for the mParticle SFTP server](#2-get-credentials-for-the-mparticle-sftp-server)
- [3. Configure the Custom CSV Feed](#3-configure-the-custom-csv-feed)
- [4. Drop CSV files on the SFTP server](#4-drop-csv-files-on-the-sftp-server)

## 1. Create CSV files

Prepare the CSV files for import. Files must follow the guidelines in this section.

### File guidelines

* Files must adhere to the [RFC4180 standards](https://www.rfc-editor.org/rfc/rfc4180.html) for CSV formatting. 
* Files must be sent in one of the following formats:
  *  A plain CSV (`.csv`)
  *  A ZIP file containing one or more CSV files (`.zip`)
  *  A gzipped CSV (`.csv.gz`).
  *  A PGP/GPG-encrypted file with the additional extension `.gpg` appended, for example, `.csv.gpg` or `.csv.gz.gpg`). Only encrypted OR unencrypted files can be accepted, but not both.  You must use PGP encryption with mParticle’s public key. See [Encrypted files](/guides/csv/reference/#encrypted-files) for additional instructions.
* File sizes should be between 5 MB and 2 GB. If you upload files outside these limits, processing speed is slower. If possible, split the data across multiple small files, because their processing can be parallelized.
* Each file can only contain events of the same event type. You can't mix events of different types in the same file.
* Don't use subfolders.
* Each row size should be under 80 KB. Larger rows may impact performance.
* All column names must be unique.
* Each CSV file must contain fewer than 50 columns.
* File name requirements:
    * Do not use any dashes ( - ) or dots ( . ) in your file name, other than what is described below.
    * End the file name based on the event content in your file: 
        `-custom_event.csv` 
        `-commerce_event.csv`
        `-screen_view.csv`
        `-eventless.csv` for eventless uploads of user identities and attributes 

* Column names: specify fields according to our [JSON Schema](/developers/server/json-reference/), using dot notation.
    * Column names described are case sensitive.
    

### Data guidelines

* Environment: always include a column name `environment` set to `development`. Import into production environments is not supported unless otherwise advised by mParticle.
        
  **Warning:** If an `environment` column is not included, data is ingested into the production environment, which is not yet supported.

* User and Device IDs: as with any data sent to mParticle, you must include a column with at least one user ID or device ID.  

    Device IDs

    * `device_info.android_advertising_id`
    * `device_info.android_uuid`
    * `device_info.ios_advertising_id`
    * `device_info.att_authorization_status`
    * `device_info.ios_idfv`
    * `device_info.roku_advertising_id`
    * `device_info.roku_publisher_id`
    * `device_info.fire_advertising_id`
    * `device_info.microsoft_advertising_id`

    User IDs

    * `mpid` 
    * `user_identities.customerid`  
    * `user_identities.email`
    * `user_identities.facebook`
    * `user_identities.microsoft`
    * `user_identities.twitter`
    * `user_identities.yahoo`
    * `user_identities.other`
    * `user_identities.other2`
    * `user_identities.other3`
    * `user_identities.other4`

    <aside>Important: CSV files must have all the required identity columns, and the rows must have valid values in those columns to prevent processing errors.</aside><!--required by whom? how do they know they've satisfied this? -->

* User attributes:
 
    If you include user attributes, for each, include a column named as `user_attributes.key`, where _key_ is a user attribute key. For example:
    
    * `user_attributes.$FirstName`
    * `user_attributes.communication_preference`
    * `user_attributes.Member Tier`
    
    Attribute names with spaces are allowed and do not require quotes. All the keys listed in the [JSON Reference](/developers/server/json-reference/) are supported.

* Events:

    * Use a column named `events.data.timestamp_unixtime_ms` to set the event time.

    * Use a column named  `events.data.custom_attributes.key`, where _key_ is an event attribute key, to set custom event attributes.  
        Attribute names with spaces are allowed and do not require quotes. All the keys listed in the [JSON Reference](/developers/server/json-reference/) are supported.

  * Screen view events: use a column named `events.data.screen_name` if you want to include the screen name.
  * Custom events: use columns named `events.data.event_name` and `events.data.custom_event_type` to include custom events.
  * Commerce events: use columns with the following names for commerce events.  
    * `events.data.product_action.action`
    * `events.data.product_action.products.id`
    * `events.data.product_action.products.name`
    * `events.data.product_action.products.category`
    * `events.data.product_action.products.brand`
    * `events.data.product_action.products.variant`
    * `events.data.product_action.products.position`
    * `events.data.product_action.products.price`
    * `events.data.product_action.products.quantity`
    * `events.data.product_action.products.coupon_code`
    * `events.data.product_action.products.added_to_cart_time_ms`
    * `events.data.product_action.products.total_product_amount`
    * `events.data.product_action.products.custom_attributes`

    Only one product per event can be included for commerce events uploaded via CSV.

* Data types:
  
  All data in the CSV is converted to a string. The only exceptions to this are values that require a particular data type, such as MPID or IDFA.

  * Only standard custom events and screen views, and eventless batches (eventless drops of user identity and attributes), have been tested.
  * Attributes sent as arrays are not fully supported. When the entire array is present in a single cell of the CSV file, it is supported and is converted to string. Because there is no way of specifying anything but the first item in an array, repeated header columns, each subsequent column overwrites the previous one. Multiple columns don't append to the array. This is why you can only include one product for ecommerce events. Commerce events in the Events API support arrays in multiple places, but with CSV files, you can only populate a single item in each of these arrays.

* Custom manifest: You can use a custom manifest to drop files created in another system without transforming them. For details, see [Use a custom manifest](/guides/csv/reference/#use-a-custom-manifest).

## 2. Get credentials for the mParticle SFTP server 

mParticle maintains an SFTP server where you will drop your CSV files.
Use the following instructions to securely retrieve your credentials and find the hostname and path to use when you drop your files on the SFTP server.

To get your SFTP username and password:

1. Sign up for a Keybase account with your work email at https://keybase.io/. Keybase is a secure tool which includes end-to-end encrypted chat.
2. Provide your Keybase account name to your Customer Success Manager or your mParticle Solutions Consultant so that they can pass it on to our Ops team.
3. Expect to receive your SFTP access credentials in a Keybase chat from mParticle. Note that if you need to use credentials that you already have, you'll share those credentials in the Keybase chat.

## 3. Configure the Custom CSV Feed

Configure the Custom CSV Feed as input. This step provides the hostname and folder path on the SFTP server where your CSV files must be dropped.  

<aside>Subdirectories within this drop folder are not supported.  To maintain multiple directories, configure a different input for each directory.</aside>

To configure the Custom CSV Feed:

1. Visit **SETUP > Inputs > Feeds** in the mParticle UI and click the **Add Feed Input** button, then select Custom CSV Feed from the list.
    ![screenshot of feeds input setup page](/images/csv/csv-feed1.png)
    
    If you've already added the Custom CSV Feed, it won't show up in the list. Scroll through the list of feeds until you see **Custom CSV Feed**, and then click the large plus sign in the gray bar to create a new feed. You need one feed for each different event type. 
2. Enter the following values:
    * **Configuration Name**: enter a name that makes this feed easy to recognize in your list of feeds.
    * **Custom Event Name**: if you are importing a custom event, enter the name that will be used for the custom event.
    * **Custom Event Type**: if you entered a custom event name, select the event type.
    * **Custom Manifest**: if you are using a [custom manifest](/guides/csv/reference/#use-a-custom-manifest), paste it in the text box provided.
    * ** Expect Encrypted Files**: if you will import a PGP/GPG-encrypted file, select this option.
    ![screenshot of feeds input connection dialog](/images/csv/csv-feed2.png)
3. After you complete the connection configuration, click **Issue SFTP Details**. mParticle displays your hostname and path for mParticle's SFTP server.
    ![screenshot of feeds input connection completed](/images/csv/hostname.png)

## 4. Drop CSV files on the SFTP server

1. Connect to the mParticle SFTP server using the credentials provided. Once you have connected, the mParticle creates the `drop` folder. If you don't see one, create a folder named `drop`.
2. Create a new folder inside the `drop` folder, and name it using the pathname provided in the mParticle UI as shown in the previous section. For example, based on the previous example, the folder path and name is `sftp.mparticle.com:4422:drop/us1-123456789123456789/`. **Hint:** Verify that there are no trailing spaces in the name.
3. Use your credentials to upload your CSV files to mParticle's SFTP server, using the correct path and folder name from the previous step.

Files on the SFTP location are added to the processing queue nearly immediately.  Depending on file count and file size, a backlog may develop. You can observe how much data has been processed using Data Master and your outbound connections. There is no notification of processing progress or completion.

<aside><a href="https://docs.mparticle.com/guides/csv/reference/">CSV File Reference</a> provides more information about processing behavior and the advanced techniques of working with custom manifests or encrypted files.</aside>
