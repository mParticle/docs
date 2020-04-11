

### Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| -
| App Key | `string` | <unset> | Your app's Localytics App Key. |
| Track CLV as Raw Value | `bool` | False | Disable this if you are tracking customer value as revenue; enabled it otherwise.  A value of true corresponds to 'tracked as money'; false corresponds to 'raw value' under the 'Customer Value' setting for your app in Localytics. |


### Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| -
| App Version | `string` | <unset> | Mobile Web| Your app's version number |
| Session Timeout | `int` | 1800 | Mobile Web| Time in seconds until Localytics marks the session as closed. |
| Domain | `string` | <unset> | Mobile Web| Changes the domain used for cookies. Use this to track users across subdomains. |
| Track Page Views | `bool` | False | Mobile Web| Automatically track page view events. |
| Custom Dimensions | `Custom Field` | <unset> | All| If you use Custom Dimensions in Localytics, you can use "Custom Dimension 0-9" to specify which mParticle user attributes should be forwarded to Localytics as Custom Dimensions |
| Profile Attributes (Organization) | `<string> List` | <unset> | iOS, Android| Enter the list of user attributes that will be forwarded to Localytics scoped at the organization level |
| Profile Attributes (Application) | `<string> List` | <unset> | iOS, Android| Enter the list of user attributes that will be forwarded to Localytics scoped at the application level |
