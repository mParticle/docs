

### Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| -
| API Key | `string` | <unset> | Your MailChimp API Key which can be found at http://kb.mailchimp.com/article/where-can-i-find-my-api-key |


### Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| -
| Delete on Unsubscribe | `bool` | False | All| If enabled, mParticle will automatically delete users from your list when they unsubscribe. |
| Double Opt-In | `bool` | True | All| If enabled, newly-added users will receive an email asking them to confirm their subscription to the MailChimp list that corresponds to this segment.  Otherwise, users will be automatically subscribed to this list at the same time that they are added to the segment. |
| Email Type | `string` | html | All| This setting defines whether users in this segment will receive plaintext or HTML emails.  The default value is HTML. |
| List ID | `string` | <unset> | All| The MailChimp List ID that we will use to represent this segment in MailChimp.   |
