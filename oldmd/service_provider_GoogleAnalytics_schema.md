

### Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| -
| Tracking ID | `string` | <unset> | The tracking ID / web property ID. The format is UA-XXXX-Y. |
| Use Classic Analytics | `bool` | False | Use this setting if you have not yet upgraded your account to Universal Analytics.  |


### Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| -
| Use Localhost Cookie | `bool` | False | All| Allows events to be sent when running a site under localhost |
| Hash Customer ID | `bool` | False | All| If true, a hashed Customer ID, when available, will be forwarded as User ID |
| Send User IP Address | `bool` | False | All| If enabled, the user's IP address will be forwarded. |
| Enable Enhanced Ecommerce | `bool` | False | All| Use this setting if you have enhanced ecommerce enabled in your Google Analytics account |
| Send Advertising IDs | `bool` | True | All| Enable this setting if you want mParticle to send Google Ad IDs, IDFAs, Microsoft Ad IDs, and Fire TV Ad IDs to Google Analytics. |
| Late Event Action | `string` | Send | All| Choose what will happen when an event arrives too late for Google to handle the event.  Send - Send anyways. Drop - Do not send, Transform - Change the event date time to ensure event is accepted. |
| Custom dimensions | `Custom Field` | <unset> | All| Allows you to map your mParticle custom dimensions to the corresponding custom dimensions setup in Google Analytics. |
| Custom metrics | `Custom Field` | <unset> | All| Allows you to map your mParticle custom metrics to the corresponding custom metrics setup in Google Analytics. |
| Default Application Name | `string` | <unset> | All| The application name to forward to Google Analytics if one is not provided by the application or data feed |
