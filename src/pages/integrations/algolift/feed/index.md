---
title: Feed
---

[AlgoLift](https://algolift.com) determines the future lifetime value of your customers so you can optimize your investment strategy. We transforms data inputs into actions with our predictive algorithms and investment optimization technology.

## Enable the Integration

When you configure your AlgoLift feed mParticle will provide an API key and secret - send these credentials to your AlgoLift account manager for setup.

## Supported Event Types

AlgoLift does not send any events in its feed. The feed contains only user identities and user attributes sent with event-less requests.

## Supported Identities

### User Identities

* Customer ID
* Other
* Other2
* Other3
* Other4

### User Attributes

| Attribute Name | Description |
| ---|---|
| algolift_actual_revenue_{X} | `Actual revenue for the user upon turning {X}. This column is only provided for users who are X or older` 
| algolift_age | `The age of the user.` 
| algolift_churn_probability | `User’s churn probability (optional)` 
| algolift_conversion_probability | `User’s conversion probability (optional)` 
| algolift_projected_revenue_{X} | `Projected revenue for this user at age X where X can be [30, 60, 90, 180, 365]. Other ages may be requested by the client` 
| algolift_projection_date | `The date of the projection in format yyyy-mm-dd` 