
### Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| -
| Secret Key | `string` | <unset> | Your application's Secret Key value, found on the Configuration tab of the Kahuna Settings page |


### Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| -
| Send transaction data | `bool` | False | All| If true, transaction events will be forwarded to Kahuna |
| Event name list | `<string> List` | <unset> | All| List of event names that will be forwarded to Kahuna. For example: flight_selected.  Each name in this list must be entered on its own line.  This field is no longer used starting with mParticle IOS SDK 3.5.0, Android SDK 2.4.0. |
| Event attribute list | `<string> List` | <unset> | All| List of event attributes that will be forwarded to Kahuna as user attributes.  Each attribute in this list must be entered on its own line.  This field is no longer used starting with mParticle IOS SDK 3.5.0, Android SDK 2.4.0. |
