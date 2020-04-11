

### Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| -
| Token | `string` | <unset> | Project token, which you can find by clicking the gear icon on the lower left of your project. |


### Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| -
| Forward Session Start/End Messages | `bool` | True | iOS, Android| If enabled, all session start and session end messages will be forwarded to Mixpanel as separate events. |
| Session Start Event Name | `string` | session-start | iOS, Android| The event name that will be forwarded to Mixpanel on a session start message.  Only used if 'Forward Session Start/End Messages' is enabled. |
| Session End Event Name | `string` | session-end | iOS, Android| The event name that will be forwarded to Mixpanel on a session end message.  Only used if 'Forward Session Start/End Messages' is enabled. |
| Create Profile Only If Logged In | `bool` | False | iOS, Android| If enabled, Mixpanel will only forward customer profile data if a customer ID is in the list of  user's identities; if disabled, Mixpanel will always forward customer profile data. |
| Use Mixpanel People | `bool` | True | All| Enable this setting if you are using customer profiles in Mixpanel |
| Include User Attributes | `bool` | True | All| If enabled, all user attributes will be included when tracking events |
| Include Attribution Info | `bool` | False | iOS, Android| If enabled, attribution info (publisher and campaign names) will be included when tracking events. |
| Include IP Address | `bool` | True | All| If enabled, IP Address will be sent with the event. |
| Super Properties | `Custom Field` | <unset> | iOS, Android| Mapped user attributes here will always be sent as event properties (regardless of the 'Include User Attributes' setting). Note they will also be excluded from people properties. |
