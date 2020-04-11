

### Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| -
| App Key | `string` | <unset> | Urban Airship generated string identifying the app setup. Used in the application bundle. |
| App Secret | `string` | <unset> | Urban Airship generated string identifying the app setup secret. Used in the application bundle. |
| App Master Secret | `string` | <unset> | Urban Airship generated string used for server to server API access. This should never be shared or placed in an application bundle. |


### Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| -
| Notification Icon Name | `string` | Application Icon | Android| Name of the drawable resource to use for the notification icon, e.g., ic_notification. |
| Named User ID Type | `string` | none | All| The user identity which will be forwarded to Urban Airship as the named user ID  |
| Notification Accent Color | `string` | System default | Android| Accent color to be used when constructing the notification, e.g., #ff0000. |
| Event Names that map to User Tags | `Custom Field` | <unset> | All| Define the mapping of mParticle event names to the corresponding UrbanAirship tags. |
| Event Attributes that map to User Tags | `Custom Field` | <unset> | All| Define the mapping of mParticle event attributes to the corresponding UrbanAirship tags. |
| Enable Tags | `bool` | True | All| If enabled, tags will be sent to Urban Airship. |
| Send all user attributes as tags | `bool` | False | All| If enabled, all user tags and user attributes will be forwarded to Urban Airship as tags.  If not enabled, only user tags will be forwarded to Urban Airship.  This setting is dependent the value of the 'Enable Tags' setting. |
