---
title: Feed
---

[ciValue](http://www.civalue.com/): Helping Retailers & Suppliers Collaborate to Grow Customer Wallet Share, Omnichannel Personalization, Digital experience, and Data Monetization solutions for Grocery, Drug and Specialty Retailers and their suppliers.

The ciValue feed integration works in conjunction with the ciValue event integration. To receive enrichment data from ciValue, you must first connect an event input. ciValue processes the event data and then will send user data for those customers via the feed integration.

## Enable the Integration

1. Create a ciValue feed configuration in mParticle to produce API key/secret values.
2. Provide these API credentials to your ciValue account manager to connect your ciValue input data to your mParticle feed configuration.

## Supported Event Types

The ciValue feed integration sends user attribute data to enrich mParticle's user profiles. All user attributes are prefaced with `civalue_` to prevent any conflicts or overwriting with your existing user data.

## Supported Identities

### User Identities

* mParticle ID (MPID)

### User Attributes

The values and ranges for various user attributes will depend on how you have configured your data within ciValue. We have listed example values below, but you can check [ciValue's Knowledge Base](https://civalue.freshdesk.com/support/solutions) for more details.

User Attribute | Description | Possible/Example Values
------ | --------- | ---------
civalue_basket_units | Typical basket units | 3-5,<br>10-16
civalue_basket_value | Typical basket spent  | 65.43
civalue_churn_propensity | Churn Propensity is the possibility that a user will churn. > 50% is high risk | 0%-20%,<br>21%-30%,<br>31%-50%,<br>51%-70%,<br>71%-80%,<br>81%-99%,<br>Inactive,<br>New,<br>Not Interesting 
civalue_digital_wallet_share | % of a specific user's spending that goes to the digital channel |0%,<br><5%,<br>5%-10%,<br>11%-20%,<br>21%-30%,<br>31%-40%,<br>41%-50%,<br>51%-75%,<br>76%-90%,<br>91%-99%,<br>100%
civalue_discount_sensitivity | A measure of the level of discount usage by users, values may very | <3%,<br>3%-5%,<br>11%+ |
civalue_first_purchase_date | Time from first purchase |  P1W - past 1 week,<br>P1M - past 1 month,<br>P3M - past 3 months,<br>P6M - past 6 months,<br>P12M - past 1 year,<br>P24M - past two years,<br>24M+ - more than two years 
civalue_gender | User's gender | Female,<br>Male,<br>Other
civalue_loyalty_tier | Loyalty Tier is calculated using the recency, frequency, and basket value (RFM Model) | Platinum,<br>Gold,<br>Silver,<br>Bronze,<br>Occasional - Insufficient data,<br>Gone - Churn propensity is 100%,<br>New - Less than 4 visits in store and first visit within 6 replenishment periods<br>Unknown 
civalue_marketing_tier | The Marketing Tier is a combined measure of the user’s loyalty and churn risk, The Marketing Tier is used to split the users into groups to apply a communication strategy per group |Control,<br>Best customers,<br>Best in risk,<br>Average customers,<br>Average in risk,<br>Occasional,<br>New,<br>Potentially in risk,<br>Inactive,<br>Other
civalue_preferred_channel | The channel of the stores the user typically shops in | Offline,<br>Online
civalue_preferred_format | The format of the stores the user typically shops in | Hyper market,<br> Small Supermarket,<br>Medium Supermarket,<br>Large Supermarket |
civalue_preferred_region | The region in which the user typically shops | North,<br>East,<br>West
civalue_preferred_store | The store which the user visits most frequently |
civalue_recency | Time since the last purchase |P1W - past 1 week,<br>P1M - past 1 month,<br>P3M - past 3 months,<br>P6M - past 6 months,<br>P12M - past 1 year,<br>P24M - past two years,<br>24M+ - more than two years
civalue_tenure | Time a user has been a member of the loyalty program |New,<br>1-3 month,<br>3-6 month,<br>Less than a year,<br>1-3 years,<br>More than 3 years,<br>Unknown
civalue_trend | The general direction of the user's purchases in the store indicating whether they went up, down or did not change |Up,<br>Stable,<br>Down,<br>UnStable,<br>Unknown
civalue_trip_purpose | The main type of baskets a user is purchasing |Urgent Need,<br>Express Lane,<br>Fill Up,<br>Pantry Stocking,<br>Unknown
civalue_value_tier | Total spent at a store level. | <400,<br>400-658
civalue_visits_frequency | How often user purchase in this store |Weekly,<br>Bi-Weekly,<br>3rd week,<br>Monthly,<br>Bi-Monthly,<br>Quarterly,<br>Quarterly+,<br>Unknown
civalue_wallet_share | % of user's spending for the leading category |0%,<br><5%,<br>5%-10%,<br>11%-20%,<br>21%-30%,<br>31%-40%,<br>41%-50%,<br>51%-75%,<br>76%-90%,<br>91%-99%,<br>100%