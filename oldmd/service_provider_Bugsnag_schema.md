

### Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| -
| API Key | `string` | <unset> | Your app's Bugsnag Project API Key.  You can find this on your app's Project Settings page in Bugsnag's dashboard. |
| Send Messages Securely | `bool` | True | If enabled, mParticle will forward all data to Bugsnag using SSL.  In some development and testing situations, in might be beneficial to have this disabled, but it should always be enabled before your app goes live. |


### Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| -
| Include User Attributes | `bool` | True | All| If enabled, mParticle will forward user attributes to Bugsnag in crash report messages. |
| Include User Identities | `bool` | True | All| If enabled, mParticle will forward user identity information to Bugsnag in crash report messages. |
