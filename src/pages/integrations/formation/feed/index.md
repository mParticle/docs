---
title: Feed
---

[Formation](https://formation.ai/) is the global leader in developing solutions that use AI and ML to deliver unique, tailored, individual offers to customers at enterprise scale, driving 3x lift in incremental revenue and doubling marketing efficiency.

## Enable the Integration

1. Set up a Formation feed configuration in mParticle in order to generate API key/secret values.
2. Provide your API credentials to your Formation account manager to connect your Formation account with your mParticle feed configuration.

## Supported Event Types

Formation will send the following events to mParticle as Custom Events of type `other`. Full details on the events sent by Formation and the possible attributes within those events can be found below.

| Event | Event Attributes | Description |
|---|---|---|
| Offer Activated | `tags`, `unique_offer_id` | Formation sends this event when a customer opts into an offer. |
| Offer Completed | `end_time`, `offer_reward`, `offer_type`, `start_time`, `status`, `steps`, `tags`, `total_reward`, `unique_offer_id` | Formation sends this event when a customer completes their offer. |
| Offer Progressed | `end_time`, `offer_reward`, `offer_type`, `progressed_steps`, `start_time`, `status`, `steps`, `tags`, `total_reward`, `unique_offer_id` | Formation sends this event when a customer make progress towards a cumulative offer step (e.g. in a week streak, cumulative purchase offer). |
| Offer Step Achieved | `end_time`, `offer_reward`, `offer_type`, `start_time`, `status`, `steps`, `tags`, `total_reward`, `unique_offer_id` | Formation sends this event when a customer's event completes a step in their offer. |
| Offer Ready | `end_time`, `offer_reward`, `offer_type`, `start_time`, `status`, `steps`, `tags`, `total_reward`, `unique_offer_id` | Formation sends this event for each offer when a campaign is launched from the platform. |
| Reward Earned | `end_time`, `offer_type`, `reward_currency`, `reward_id`, `reward_value`, `start_time`, `status`, `steps`, `tags`, `unique_offer_id` | Formation sends this event when a customer's progress produces a reward. |

### Event Attributes

You can see details of what wil be included in the JSON objects on the [Formation developer page](https://developer.formation.ai/) through the [Status response](https://developer.formation.ai/#tag/Status/paths/~1status~1%7BCustomerID%7D/get) documentation.

| Attribute Name | Description |
|---|---|
end_time | Local timestamp representing when the offer is no longer active for the customer.
offer_reward | JSON object that describes the reward the customer will receive for completing the offer.
offer_type | String identifying offer type or use case. This is frequently used to determine which creative template to use to represent game status.
progressed_steps | JSON object that describes which step(s) progressed and what the progression of each was.
reward_currency | The currency being used to reward. Is often points.
reward_id | The identifier of this reward event which can be tied back to a reward object in the offer.
reward_value | The quantity rewarded to the customer based on progress.
start_time | Local timestamp representing when the offer becomes active for the customer.
status | Possbile values are `Eligible`, `Active`, or `Completed`. Represents whether the customer is yet to opt in, has opted in and is playing the game, or has achieved the full game.
steps | JSON of current steps & state in the offer for detailed creative & analysis.
tags | JSON of offer metadata fields.
total_reward | JSON object that describes the total reward available for the offer.
unique_offer_id | String representing unique Formation internal Offer ID.

## Supported Identities

### User Identities

* Customer ID
