---
title: Feed
---

<a href="https://www.actable.com/" target="_blank">Actable</a> is a customer data accelerator that organizes, analyzes and activates first party customer data for enterprises to create outsize business returns.  The Actable Predictive Suite is an ML modeling engine designed to enrich an enterprise’s mParticle investment with predictive customer scoring to inform outbound marketing decisions, as well as additive customer insights to better discern customer value, product alignment, and LTV. 

## Enable the Integration

1. Set up an Actable feed in mParticle to generate API key/secret values.
2. Share the feed credentials with your Actable representative to have them initialize the flow of data.

## Supported Identities

### User Identities

* Customer ID

## Supported Event Types

The Actable feed sends eventless data into mParticle that adds `user_attributes` to a user based on their Customer ID. Data will contain:
* a machine learning-generated score as an integer between 1 and 100 (for example: `actable_propensity_score`)
* a timestamp for the score (for example: `actable_propensity_score_timestamp`)

### Supported Machine Learning Scores

Score Name | Description
------ | ---------
| actable_churn_score | Likelihood of the customer to churn in period defined by the Actable model. |
| actable_nextpurchase_score | Likelihood of the customer to purchase something in the period defined by the Actable model. |
| actable_propensity_score | Likelihood of the customer to perform an action defined by the Actable model. |
