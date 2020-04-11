
## AgilOne

AgilOne is is a predictive marketing cloud that helps retailers deliver omni-channel experiences in order to increase customer loyalty and profitability.

### Prerequisites

In order to enable mParticle’s integration with AgilOne, you will need to work with your AgilOne representative to obtain credentials for your AgilOne environment. See Configuration Settings for details.

### Custom Flags

The AgilOne integration supports one Custom Flag: `AgilOne.SubType`. This custom flag is necessary for sending checkout events to AgilOne. Allowed values for this custom flag are: `"Demand"`, `"Canceled"`, `"Shipped"`, or `"Returned"`. If this flag is not set for an event where it is required, it defaults to `"Demand"`.


### Data Processing Notes

mParticle forwards all custom events and user attributes to AgilOne, but for these to be captured, they must first be defined in the AgilOne dashboard. For this reason, unlike most integrations, the event filter for AgilOne initially sets all events to Off. You must manually enable each event you want to forward to AgilOne and ensure that the necessary event and attribute names are defined in the AgilOne dashboard.

You can provide credentials for both your Production and CS AgilOne environments in the configuration settings. mParticle will identify Development and Production events and forward them to the appropriate AgilOne environment. To use a development environment, you must explicitly set up separate event configurations for Production and Development. You cannot check `Use same settings for Development and Production`.

### Event Data Mapping

Each message forwarded to AgilOne contains up to four sections:

* `events`: type and attributes of the event that occurred,
* `customers`: users involved in the event,
* `transactions`: id and attributes of any transaction in a commerce event
* `transactionItems` list of items involved in the transaction.


We support the following AgilOne event types

| AgilOne Event | mParticle trigger |
| ------------------------------- |
| `productBrowsed` | Product Action - View Detail |
| `cartUpdated` | Product Action - Add to Cart / Remove from cart |
| `checkout` | Product Action - Purchase |
| `{{ custom event name }}` | Custom Event

<aside>mParticle will send all custom events to AgilOne, but only events that match custom events defined in the AgilOne dashboard will actually be captured.</aside>

The following AgilOne events can also be supported via Custom Mappings

* `Login` 
* `Logout`  
* `onsiteSearch`  
* `productBrowsed`  
* `categoryBrowsed`
* `brandBrowsed`
* `cartUpdated`

#### Event Attribute Mappings

| AgilOne | mParticle | Required | Notes |
| -------------------------------------- |
| `Type` | `event.data.event_name` | Yes | Event type for standard events will be set as above. This mapping applies to custom types only, but the custom event must be defined in AgilOne before it can be captured.
| `SourceCustomerNumber` | `user_identities` | Yes | Customer ID used if available, if not, email can be used. If neither are available the event is not sent.
| `SourceTransactionNumber` | `event.data.product_action.transaction_id` | | Only for `checkout` events.
| `SourceProductNumber` | `product.id` | | Only for `productBrowsed` and `cartUpdated` events.
| `EventTimestamp` | `event.data.timestamp_unixtime_ms` | | 
| `Variables` | `device_info.http_header_user_agent` | | mParticle forwards only a single key-value pair containing the UserAgent header.
| `UserClient` |  |  | Static value `A` is used for all events.
| `cookie` |  | Yes | Static value `a1cookie` is used for all events. |


#### Customer Attribute Mappings

| AgilOne | mParticle | Required | Notes |
| -------------------------------------- |
| `SourceCustomerNumber` | `user_identities` | Yes | Customer ID used if available, if not, email can be used. If neither are available the event is not sent. |
| `Email` | `user_identities` | Recommended | User identity where `identity_type == "email"`, if available. |
| `MobileAdvertisingID` | `device_info` | | IDFA for iOS devices, GAID for Android.
| `MobileDeviceId` | `device_info` | |IDFV for iOS devices, Android ID for Android.
| `{{ custom attributes }}` | `user_attributes` | |User attributes are sent by mParticle but must be defined in AgilOne before they can be captured.

#### Transaction Attribute Mappings

These apply only to checkout events

| AgilOne | mParticle | Required | Notes |
| -------------------------------------- |
| `SourceTransactionNumber` | `event.data.product_action.transaction_id` | Yes
| `SourceOrganizationNumber` |  | Yes | Defined in configuration settings.
| `SourceCustomerNumber` | `user_identities` | Yes | Customer ID used if available, if not, email can be used. If neither are available the event is not sent. |
| `Tax` | `event.data.product_action.tax_amount`
| `Type` | | Yes | For checkout events this value will always be `purchase`.



#### Transaction Item Attribute Mappings

These apply only to checkout events

| AgilOne | mParticle | Required | Notes |
| -------------------------------------- |
| `SourceTransactionItemNumber` | `event.data.product_action.transaction_id` | Yes
| `SourceOrganizationNumber` |  | Yes | Defined in configuration settings.
| `SaleRevenue` | `product.quantity` x `product.price` | Recommended | 
| `Type` | | Yes | For checkout events this value will always be `purchase`.
| `SubType` | `event.custom_flags.AgilOne.SubType` | Yes | This custom flag must be set to one of the following values: `"Demand"`, `"Canceled"`, `"Shipped"`, or `"Returned"`. If the custom flag is not set, the value defaults to `"Demand"`.
| `Discount` | `product.coupon_code` | 
| `{{ product attributes }}` | `product` | 