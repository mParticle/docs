---
title: Feed
---

[Formation](https://formation.ai/) is the global leader in developing solutions that use AI and ML to deliver unique, tailored, individual offers to customers at enterprise scale, driving 3x lift in incremental revenue and doubling marketing efficiency.

## Enable the Integration

1. Set up a Formation feed configuration in mParticle in order to generate API key/secret values.
2. Provide your API credentials to your Formation account manager to connect your Formation account with your mParticle feed configuration.

## Supported Event Types

Formation will send the following events to mParticle as Custom Events of type `other`. Full details on the events sent by Formation and the possible attributes within those events can be found below.

| Event | Description | Event Attributes | 
|---|---|---|
| achieved | Formation sends this event when a customer makes progress on an offer by opting in or completing a qualifying event. | `current_status`, `formation_offer_id`, `game_status`, `game_type`, `is_reward`,  `last_change`, 'metadata', `num_steps` , `offer_expiration`, `offer_start` |
| activated | Formation sends this event when a customer opts into an offer | `current_status`, `formation_offer_id`, `game_status`, `game_type`, 'metadata', `num_steps`, `offer_expiration`, `offer_start` | 
| assign_offer |  Formation sends this event when an offer is launched to a customer. This can happen at activation time, or before it. | `current_status`, `formation_offer_id`, `game_status`, `game_type`, 'metadata', `num_steps`, `offer_expiration`,`offer_start` |
| completed | Formation sends this event when a customer completes the last goal in an offer. | `current_status`, `formation_offer_id`, `game_status`, `game_type`, 'metadata', `num_steps`, `offer_expiration`, `offer_start` | 
| reward | Formation sends this event when a customer's progress produces a reward |  `current_status`, `formation_offer_id`, `game_status`, `game_type`, 'metadata', `num_steps` , `offer_expiration`,  `offer_start`, `reward_amount`, `reward_currency`, `reward_reference` | 

### Event Attributes

| Attribute Name | Description |
|---|---|
current_status | Possbile values are `Eligible`, `Active`, or `Completed`. Represents whether the customer is yet to opt in, has opted in and is playing the game, or has achieved the full game.
formation_offer_id | String representing unique Formation internal Offer ID.
game_status | JSON of current steps & state in the offer for detailed creative & analysis.
game_type | String identifying offer type or use case. This is frequently used to determine which creative template to use to represent game status.
is_reward | Possible values are "`True`" or "`False`". A string representing whether or not this progress resulted in points being issued. In this case, it is often best to leverage the Reward Earned event for creative.
last_change	| Possible values are `Opted In`, `Step Completed`, or `Game Completed`.
metadata | JSON of offer metadata fields.
num_steps | Number of steps in the game (goals in game_status).
offer_expiration | UTC Timestamp (ISO8601) representing when the offer is no longer active for the customer.
offer_start | UTC Timestamp (ISO8601) representing when the offer is active for the customer.
reward_amount | The quantity rewarded to the customer based on progress.
reward_currency | The currency being used to reward. Is often points.
reward_reference | A fixed value, configured for the integration, that allows for accounting of reward issuance back to Formation.

## Supported Identities

### User Identities

* Customer ID
