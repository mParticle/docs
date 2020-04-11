

### Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| -
| App ID | `string` | <unset> | Your app's Kochava App ID.  If you're not sure what this ID is or where to find it, please contact your Kochava account representative for assistance. |


### Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| -
| Currency | `string` | USD | All| The currency that Kochava should use when tracking and reporting LTV.  The default value is USD. |
| Enable 'retrieveAttribution' | `bool` | True | All| If enabled, mParticle will initialize Kochava's embedded SDK with 'retrieveAttribution' option enabled. Note that you'd have to follow Kochava's instructions on how to retrieve attribution data in your app. |
| Enable Console Logging | `bool` | False | All| If enabled, Kochava-specific debugging information will be outputted to LogCat for Android, or to the XCode debugging console for Apple OS. |
| Limit ad tracking | `bool` | False | All| If enabled, mParticle will initialize Kochava's embedded SDK with ad tracking disabled. |
