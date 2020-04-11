

### Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| -
| API Key | `string` | <unset> | Your app's API Key can be found in your Appboy dashboard. |


### Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| -
| Enable HTML within in-app messages | `bool` | False | Mobile Web| Enable HTML within in-app messages. This correlates to the enableHtmlInAppMessages setting of the Appboy SDK. |
| Forward screen view messages | `bool` | False | All| If enabled, all screen view messages will be forwarded to Appboy as separate events. |
| Automatically display new in-app messages | `bool` | True | Mobile Web| Automatically display new in-app messages when they come in from the server. |
| App Group Identifier | `string` |  | All| The App Group Identifier can be found in the developer console section of the Appboy dashboard.  This field is optional when sending in data via the SDK, but is required for using the S2S API. |
| Push Enabled | `bool` | True | iOS, Android| Forward GCM registration IDs to the Appboy SDK and enable Appboy push notifications. |
| Event Attributes that add to array | `Custom Field` |  | iOS, Android| Select your mParticle event names and event attributes and enter the corresponding Appboy custom attribute array name you want the event attribute ADDED to. |
| Event Attributes that remove from array | `Custom Field` |  | iOS, Android| Select your mParticle event names and event attributes and enter the corresponding Appboy custom attribute array name you want the event attribute REMOVED from. |
| Event Attributes that set to custom attribute value | `Custom Field` |  | iOS, Android| Select your mParticle event names and event attributes and enter the corresponding Appboy custom attribute you want the event attribute to map to. Note each time this event attribute is present, it will get sent to Appboy and overwrite any previously sent value. |
| Appboy SDK Flush Interval | `string` | <unset> | iOS, tvOS| Appboy SDK data flush internal in seconds (iOS only). Refer to Appboy SDK doc for "ABKFlushIntervalOptionKey". |
| Appboy SDK Request Policy | `string` | <unset> | iOS, tvOS| Appboy SDK request policy at app start time (iOS only). Refer to Appboy SDK doc for "ABKRequestProcessingPolicyOptionKey". |
| Appboy SDK Session Timeout | `string` | <unset> | All| Appboy SDK time interval for session time out in seconds. |
| Appboy SDK Minimum Time Interval Between Triggers | `string` | <unset> | iOS, tvOS| Appboy SDK minimum time interval in seconds between triggers (iOS only). Refer to Appboy SDK doc for "ABKMinimumTriggerTimeIntervalKey". |
| Appboy SDK Collect IDFA? | `bool` | False | iOS, tvOS| Informs the Appboy Kit whether to collect IDFA. |
