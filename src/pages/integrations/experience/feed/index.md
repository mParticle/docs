---
title: Feed
---

[Experience](https://www.expapp.com/) is a mobile commerce platform, flexible ticket sales, and data solutions empower sports and entertainment leaders to generate new revenue streams, sell more tickets, and make smarter decisions.

The Experience integration is an [unbound feed](/guides/feeds/#unbound-feeds).


## Enable the Feed

1. Add the Experience feed integration from the mParticle directory.
2. Copy the generated Server to Server Key and Secret.
3. Provide these credentials to your Experience customer service representative and ask them to enable the mParticle feed.

## Supported Events

The Experience feed forwards only commerce events to mParticle.

## Supported User Identities

The Experience feed forwards email addresses to mParticle.

## Data Format

Experience forwards commerce events to mParticle for each ticket purchase. The following custom attributes may be set on the commerce event and the product:

* `event_id` -- A unique identifier for the event.
* `event_date` -- The date of the event as a date string. For example: `"2019-03-28 22:55:00 EDT"`
* `event_name` -- The name of event as a string. For example, `"Elvis Costello"`
* `partner_id` -- An identifying ID for the partner. For example, `"1346"`
* `partner_name` -- The name of the partner as a string. For example, `"Verizon Amphitheatre"`
* `venue_id` -- An identifying ID for the venue. For example, `"1365"`
* `purchase_location` -- Where the purchase was made. For example, `"app"`
* `seat_number` -- The specific seat number that was purchased
* `row` -- The specific row location of the seat purchased
* `section` -- The specific section in which the row and seat are located, if applicable
* `transaction_id` -- The unique identifier for the transaction(s). For example, `abc1234`

### Example JSON

~~~json
{
  "events":[
    {
      "event_type":"commerce_event",
      "data":{
        "source_message_id":"818276ab-fd2c-40a9-99e7-8ee511b39565",
        "session_uuid":"5f23f8a8-ec69-4eaf-9e2e-840d35e71d13",
        "timestamp_unixtime_ms":"1553737023949",
        "currency_code":"USD",
        "product_action":{
          "action":"purchase",
          "total_amount":"10.00",
          "transaction_id": "abc1234"
          "products":[
            {
              "id":"0",
              "name":"EXP--UPGRADE",
              "price":"10.00",
              "quantity":"1",
              "total_product_amount":"10.00",
              "category":"EXP--Orchestra Center",
              "custom_attributes":{
                "event_id":"45958",
                "event_date":"2019-03-28 22:55:00 EDT",
                "event_name":"Elvis Costello",
                "external_event_id":"TEST",
                "partner_id":"1346",
                "partner_name":"Verizon Amphitheatre",
                "venue_id":"1365",
                "venue_name":"Verizon Amphitheatre",
                "purchase_location":"app",
                "seat_number":"6",
                "row":"1",
                "section":"ORCH2"  
              }
            }
          ]
        }
      },
      "custom_attributes":{
        "event_id":"45958",
        "event_date":"2019-03-28 22:55:00 EDT",
        "event_name":"Elvis Costello",
        "external_event_id":"TEST",
        "partner_id":"1346",
        "partner_name":"Verizon Amphitheatre",
        "venue_id":"1365",
        "venue_name":"Verizon Amphitheatre",
        "purchase_location":"app"
      }
    }
  ],
  "user_identities":{
    "email":"steve@example.com"
  },
  "schema_version":"1",
  "environment":"production"
}
 
~~~
