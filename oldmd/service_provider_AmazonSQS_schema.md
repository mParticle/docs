

### Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| -
| Access Key ID | `string` | <unset> | This is your IAM user's Access Key Id, which can be found on your IAM dashboard, or in the credentials.csv file that you might have downloaded after creating the IAM user. |
| Secret Access Key | `string` | <unset> | This is your IAM user's Secret Access Key, which can be found in the credentials.csv file that you might have downloaded after creating the IAM user. |


### Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| -
| Queue URL | `string` | <unset> | All| This is your SQS queue URL. |
| Unique ID | `string` | <unset> | All| An optional string identifier for your app that will be forwarded with each event batch.  Standard app identifiers (Apple OS Bundle ID, Android Package Name) will be forwarded regardless of this setting. |
| Send Lifecycle Events | `bool` | True | All| If enabled, lifecycle events (application start/stop, session start/end) will be forwarded. |
| Send Screen Views | `bool` | True | All| If enabled, screen view events will be forwarded. |
| Send Crash Events | `bool` | True | All| If enabled, app crashes will be forwarded. |
| Send Network Performance Events | `bool` | True | All| If enabled, network performance events will be forwarded. |
| Send Custom Events | `bool` | True | All| If enabled, custom app events will be forwarded. |
| Send Push Registrations and Receipts | `bool` | True | All| If enabled, push registration and receipt notifications will be forwarded. |
| Send as Batch | `bool` | True | All| If enabled, this setting will cause your app's events to be sent in (roughly) 10-minute batches per device.  If disabled, mParticle will POST each event to you individually, as its received.  This setting is ignored if "Wait for Complete Batch" is enabled. |
| Wait for Complete Batch | `bool` | False | All| If enabled, mParticle will POST events to you in batches only after a user session has ended, so that each event batch you receive will represent a full session of user activity within your app. |
| Include Location Information | `bool` | True | All| If enabled, location data will be forwarded with event data whenever possible. |
| Include User Identities | `bool` | True | All| If enabled, user identity information will be forwarded with event batches. |
| Send Profile Change Events | `bool` | True | All| Deprecated, do not use. Instead, log a custom event at `login`, `logout`, and `modify`. |
| Send Commerce Events | `bool` | True | All| If enabled, commerce events will be forwarded. |
| Include Metadata | `bool` | True | All| If enabled, the following metadata - application_info, device_info and source_info will be forwarded. |
| Include User Attribute Change Events | `bool` | False | All| If enabled, User Attribute Change Events will be forwarded. |
| Include User Identity Change Events | `bool` | False | All| If enabled, User Identity Change Events will be forwarded. |
