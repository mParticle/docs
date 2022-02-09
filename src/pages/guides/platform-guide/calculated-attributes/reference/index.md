---
title: Calculated Attributes Reference
order: 4.3
---

Use the following tables and lists to help you define each calculated attribute.

## Calculations

The following table lists all supported calculations. 

Group | Calculation Type  | Format | Example | Trigger
---| ---|---|--| ----
Count | Count |  Numeric | `123` | synchronous
Aggregation | Sum | Numeric | `123.123` | synchronous
Aggregation | Minimum |Numeric | `123.123` | synchronous
Aggregation | Maximum |Numeric | `123.123` | synchronous
Aggregation | Average | Numeric | `123.123` | asynchronous
Aggregation | Most frequent  | Dynamic | `romance` | asynchronous
Aggregation | Unique values count | Numeric | `34` | asynchronous
Occurrence | First value | Dynamic | `comedy` | asynchronous (until observed)
Occurrence | Last value  | Dynamic | `action`| synchronous
Occurrence | First timestamp | Timestamp | `2020-01-01T22:14:47.1051728Z` | asynchronous (until observed)
Occurrence | Last timestamp  | Timestamp | `2020-01-10T22:14:47.1051728Z` | synchronous
List | Unique list | Comma separated list of dynamic values; maximum of 100. | `"Item 1","Item 2","Item 3"` | synchronous

Be aware of the following before creating your calculation attributes:

* Calculated attributes require server-side forwarding. Therefore, this feature isn’t available for kit-only integrations that support solely client-side forwarding.
* All timestamp values are in ISO 8601 format in the UTC timezone. 
* Several calculations produce results with types that depend on the type of the event attribute selected, for example `First Value` returns a string if the event attribute selected is a string. All attribute values in our platform are stored as strings, including calculated attributes.
* Calculation speeds listed are after the values have been initialized. 
* Setting the date range to **Within the Last** causes all calculations to be synchronous. Additionally, after the range has expired, the caluclated attribute value returns to zero or null. This happens in approximately 10% of the time specified or less. For example, if you set **Within the Last** to one day, the reset takes place within one day plus two hours. If you set the value to 10 days, the reset takes place within 11 days.
* For unique lists, up to 100 values are returned. The values are selected based roughly on the order in which mParticle received the data, though the ordering is not guaranteed.
* For aggregation CAs:
  
  * More than one attribute may occur the same number of times, creating a tie. To break the tie, mParticle sorts the attirbute name alphabetically and chooses the first attribute.
  * After the first 100 values are collected for a `Most Frequent` or `Unique List` CA, no more values are collected. For `Most Frequent`, the frequency of the first 100 are continuously evaluated, but no new values are added. For `Unique List`, mParticle keeps only the first 100 seen values. To trigger a re-collection of values for either calculation type, edit the CA definition or create a new one.

## Calculation Date Range

The following date ranges in calculated attributes are supported:

* **Within the Last**: limit calculations to the period of a specified number of days or weeks ago to now.  For example, "most frequent product categories viewed over the last 30 days."
* **Since**: limit calculations to the period of a specified start date to now.

## Type Conversions
Some calculated attributes, like `sum`, require numeric event attributes to function. If you select an attribute that is not detected as the correct type, the platform will warn you about using those fields in the calculated attribute definition. You <b>can still use</b> the calculated attribute despite the warning and it will attempt to convert the string values into numerics. For example, if you pass the attribute `amount` in as a numeric string like `"34.32"`, a `sum` calculation will still work correctly: the string `"34.32"` will be converted to the decimal value `34.32`.

![](/images/ca-type-warning.png)

## Commerce Quantity Fields

The following behaviors affect commerce event attributes (`commerce_events`) in some calculated attributes:

  ### Product Events

  The product action (`product_action`) and product impression (`product_impression`) attributes can be used in the quantity field for calculations. Note the following behaviors:

  * Average uses the quantity field in a products array when averaging the value of the price field.
  * First value picks the first product in an array if the product attribute is selected.
  * Last value picks last product in an array if the product attribute is selected.
  * First timestamp is the batch timestamp.
  * Last timestamp is the batch timestamp.
  * Unique list can pick any field in an events or products array.
  * Most frequent uses quantity for calculating the most frequent for non-numeric fields such as brand, category, or coupon code.

  ### Promotion Events

  The promotion action (`promotion_action`) attribute can be used in the quantity field for calculations. Note the following behaviors:

  * First value picks the first promotion in a promotions array.
  * Last value picks the last promotion in a promotions array.
  * First timestamp is the batch timestamp.
  * Last timestamp is the batch timestamp.
  * Unique list can pick any field in an events or promotions array.
  * Most frequent can pick any field in an events or promotions array.
