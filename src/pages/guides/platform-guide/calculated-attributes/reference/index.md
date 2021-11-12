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
Aggregation | Unique Values Count | Numeric | `34` | asynchronous
Occurrence | First value | Dynamic | `comedy` | asynchronous (until observed)
Occurrence | Last value  | Dynamic | `action`| synchronous
Occurrence | First timestamp | Timestamp | `2020-01-01T22:14:47.1051728Z` | asynchronous (until observed)
Occurrence | Last timestamp  | Timestamp | `2020-01-10T22:14:47.1051728Z` | synchronous
List | Unique List | Comma separated list of dynamic values; maximum of 100. | `"Item 1","Item 2","Item 3"` | synchronous

Be aware of the following before creating your calculation attributes:

* All timestamp values are in ISO 8601 format in the UTC timezone. 
* Several calculations produce results with types that depend on the type of the event attribute selected, for example `First Value` returns a string if the event attribute selected is a string.* Calculation speeds listed are after the values have been initialized. 
* Setting the date range to **Within the Last** causes all calculations to synchronous.

## Calculation Date Range

The following date ranges in calculated attributes are supported:

* **Within the Last**: limit calculations to the period of a specified number of days or weeks ago to now.  For example, "most frequent product categories viewed over the last 30 days."
* **Since**: limit calculations to the period of a specified start date to now.

## Type Conversions
Some calculated attributes, like `sum`, require numeric event attributes to function. If you select an attribute that is not detected as the correct type, the platform will warn you about using those fields in the calculated attribute definition. You <b>can still use</b> the calculated attribute despite the warning and it will attempt to convert the string values into numerics. For example, if you pass the attribute `amount` in as a numeric string like `"34.32"`, a `sum` calculation will still work correctly: the string `"34.32"` will be converted to the decimal value `34.32`.

![](/images/ca-type-warning.png)
