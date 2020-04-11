

### Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| -
| Report Suite IDs | `string` | <unset> | The report suite ID from Adobe settings page.  Multiple IDs can be entered, separated by commas |
| Tracking Server | `string` | <unset> | The URL of the Adobe tracking server |
| Character Set | `string` | UTF-8 | The character set used to display data in the Adobe interface |
| Timestamp Enabled | `bool` | True | If enabled, the timestamp will be included in messages sent to Adobe |
| Send Messages Securely | `bool` | True | If enabled, mParticle will forward all data to Adobe using SSL |
| Offline Tracking Enabled | `bool` | True | If enabled, any messages that are received when the device is offline will be forwarded |


### Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| -
| Use Customer ID | `bool` | True | All| If enabled, Customer ID will be forwarded if it exists |
| Include User Attributes | `bool` | False | All| If enabled, all user attributes will be included in the context data for each event |
| Generate Location Message | `bool` | True | All| If enabled, location data will be forwarded if available |
| Context Variables | `Custom Field` | <unset> | All| Mapping of your application's event attributes to Adobe context variables |
| Product Incrementors | `Custom Field` | <unset> | All| Mapping of your application's custom event names to Adobe product incrementor event numbers |
| Product Merchandisings | `Custom Field` | <unset> | All| Mapping of your application's event attributes to Adobe product merchandising |
| Events | `Custom Field` | <unset> | All| Mapping of your application's custom event names to Adobe event numbers |
| Props | `Custom Field` | <unset> | All| Mapping of your application's custom event attributes to Adobe props |
| eVars | `Custom Field` | <unset> | All| Mapping of your application's custom event attributes to Adobe eVars |
| Hier Variables | `Custom Field` | <unset> | All| Mapping of your application's screen view attributes to Adobe hier variables |
| App and Device Attributes | `string` | <unset> | All| A comma separated list of app and device attributes to forward as context variables |
