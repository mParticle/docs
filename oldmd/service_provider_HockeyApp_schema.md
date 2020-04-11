

### Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| -
| App ID | `string` | <unset> | Your app's HockeyApp App ID.  You can find it on the App Overview page in HockeyApp's dashboard. |


### Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| -
| Include User ID | `bool` | True | All| If enabled, mParticle will forward a user ID value with each crash or handled exception.  The user ID will be either the user's Customer ID or a device ID (IDFA or Android ID), depending on what "Use Customer ID" is set to. |
| Use Customer ID | `bool` | False | All| If "Include User ID" is disabled, then this setting has no effect.  If "Include User ID" is enabled and this setting is also enabled, then mParticle will forward user's Customer ID values to HockeyApp with each crash or handled exception.  If "Include User ID" is enabled but this setting is disabled, then mParticle will forward a device ID instead. |
