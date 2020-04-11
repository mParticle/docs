

### Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| -
| App ID | `string` | <unset> | Your Leanplum's App ID. |
| Client Key | `string` | <unset> | Your Leanplum's Client Key, which is named either Production or Development under Keys & Settings in the Dashboard. |


### Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| -
| User ID | `string` | customerId | All| Select which user identity to forward to Leanplum as your customer's user ID. |
| Android Device ID | `string` | gaidThenAndroidId | Android| Select which value to forward to Leanplum as Device ID.  The default is to use Google Advertising identifier and if not available Android ID, but can be modified to always use Google Advertising ID or the Android ID. |
| IOS Device ID | `string` | idfvForProdAndIdfaForDev | iOS| Select which value to forward to Leanplum as Device ID.  The default is to use IDFV in Production and the IDFA in Development, but can be modified to always use IDFV or IDFA for both environments. |
