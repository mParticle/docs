---
title: Feed
---

<a href="https://punchh.com/" target="_blank">Punchh</a> creates the consistent, modern experiences consumers expect. Punchh is the world leader in delivering dynamic, one-to-one customer engagement through AI, mobile-first expertise, and omnichannel communications.

## Enable the Integrations

1. Set up a Punchh feed configuration in mParticle in order to generate API key/secret values.  
2. Provide your API credentials to your Punchh account manager to connect your Punchh account with your mParticle feed configuration.

Please check with your Punchh account manager for more details on configuration steps and event details.

The Punchh feed integration sends user engagement and user attribute data to enrich mPartcile's user profiles. All user attributes are prefaced with `Punchh_` to prevent any conflicts or overwriting with your existing user data.

## Supported Identities

### User Identities

* Email Address
* Partner ID (punchh_user_id)

## Supported Event Types

Punchh will send the following events to mParticle as Custom Events of type `other`. Full details on the events sent by Punchh and the possible attributes within those events can be found below.

| Event | Description | Event Attributes |
|---|---|---|
| Marketing Notifications | Event sent on user basis for any campaign related activity recorded against a user. These can further be categorized under various campaign types in the payload e.g. signup_campaign or referral campaign etc. Payloads may vary based on the type of notification event. |  `amount`, `campaign_id`, `campaign_name`, `campaign_type`, `challenge_completed_steps`, `challenge_remaining_steps`, `challenge_total_steps`, `checkin_id`, `coupon_code`, `coupon_end_date`, `coupon_gift_value`, `coupon_reward_name`, `days_of_week`, `donation_type`, `event_action`, `event_name`, `event_type`, `extra_points`, `for_referring_full_name`, `gift_reason`, `gifted_amount`, `hours_of_day`, `item_donated`, `location_name`, `points`, `raw_referral_points`, `referral_points`, `reward_becomes_available_at`, `reward_expiring_at`, `reward_expiring_at_tz`, `reward_id`, `reward_name`, `schedule` | 
| Redeemable | This is a business level event which gets triggered when an offer is created or modified in the Punchh dashboard by business admins. | `applicable_as_loyalty_redemption`, `business_id`, `created_at`, `description`, `discount_amount`, `discount_channel`, `expire_redemption_code_with_reward_end_date`, `expiry_date`, `meta_data`, `name`, `points_required_to_redeem`, `redeemable_id`, `redeemable_image_url`, `redemption_expiry`, `status`, `updated_at` |
| Rewards | Reward gifted to a user due to any campaign or an activity. | `becomes_available_at`, `campaign_id`, `campaign_name`, `campaign_type`, `created_at`, `description`, `discount_amount`, `discount_channel`, `event_action`, `event_name`, `event_type`, `expiring_at`, `expiring_at_tz`, `franchisee_id`, `gift_reason`, `gifted_for_id`, `gifted_for_type`, `meta_data`, `name`, `read_at`, `redeemable_created_at`, `redeemable_id`, `redemption_id`, `reward_id`, `reward_image_url`, `reward_points_redeemed`, `status`, `store_numbers`, `updated_at` | 
| Transactional Notifications | Event sent on user basis for any transactional activity recorded against a user. These can further be categorized under various event types in the payload e.g. points_expiry or points_expiry_reminder. Event attributes will vary based on the type of notification event. | `after_update_amount`, `approved`, `bar_code`, `becomes_available_at`, `before_update_amount`, `channel`, `checkin_id`, `checkin_type`, `created_at`, `description`, `discount_amount`, `discount_channel`, `earnable_amount`, `errors`, `event_action`, `event_name`, `event_type`, `expired_at`, `expiring_at_tz`, `expiring_date`, `expiring_on`, `expiring_points`, `expiring_until_date`, `external_uid`, `first_punchh_at_business`, `first_punchh_at_location`, `free_reward_amount`, `gift_count`, `gift_reason`, `location_id`, `location_name`, `manual`, `name`, `pending_refresh`, `phone_message`, `points_earned`, `points_spent`, `post_expiration_balance`, `punchh_key`, `qr_decoded`, `receipt_amount`, `receipt_date`, `redeemable_discount_amount`, `redeemable_id`, `redeemable_name`, `redeemable_points`, `refreshed_at`, `remaining_days`, `reply_text`, `reset_password_url`, `reviewer_id`, `reward_id`, `reward_image_url`, `reward_points_redeemed`, `status`, `store_number`, `transaction_no`, `unverified_receipt_amount`, `updated_at`, `user_id`, `verifications_count`, `verified_at` |
| Users | Event conveying user attribute data  |  `event_action`, `event_name`, `event_type`, `previous_changes` |


Punchh will send the following events to mParticle as Commerce Events with a product_action of `checkout`. Full details on the events sent by Punchh and the possible attributes within those events can be found below.

| Event |  Description | Event Attributes |
|---|---|---|
| Checkins | Loyalty points earned after the order is placed successfully or loyalty points gifted as a result of any campaigns of other activity |  `approved`, `bar_code`, `business_id`, `business_uuid`, `campaign_id`, `campaign_name`, `campaign_type`, `channel`, `checkin_id`, `checkin_type`, `created_at`, `earnable_amount`, `event_action`, `event_name`, `event_type`, `expired_at`, `expiring_on`, `external_uid`, `first_punchh_at_business`, `first_punchh_at_location`, `for_referring_checkin_id`, `free_punchh_campaign_id`, `gift_reason`, `gifted_by_id`, `gifted_by_type`, `gifted_for_id`, `gifted_for_type`, `item_amount`, `item_name`, `item_qty`, `location_id`, `location_name`, `menu_family`, `menu_item_id`, `menu_item_type`, `menu_major_group`, `pending_refresh`, `points_earned`, `points_spent`, `punchh_key`, `qr_decoded`, `receipt_amount`, `receipt_datetime`, `redemption_id`, `refreshed_at`, `reviewer_id`, `serial_number`, `status`, `store_number`, `transaction_no`, `unverified_receipt_amount`, `updated_at`, `verifications_count`, `verified_at` | 
| Redemption | Points or visits redeemed on the order | `admin_id`, `bar_code`, `business_id`, `business_uuid`, `channel`, `created_at`, `discount`, `employee_id`, `event_action`, `event_name`, `event_type`, `expired_at`, `expiring_on`, `force_message`, `internal_tracking_code`, `item_amount`,  `item_name`, `item_qty`, `location_id`, `location_name`, `menu_family`,  `menu_item_id`, `menu_item_type`, `menu_major_group`,`points_requested`, `processed_at`, `receipt_amount`, `receipt_datetime`, `redeemable_id`, `redeemable_name`, `redeemed_points`, `redemption_code.receipt_amount`, `redemption_code.redeemable_id`, `redemption_code.transaction_no`, `redemption_code_id`, `redemption_code_pass_apple_pass_design_id`, `redemption_code_pass_apple_pass_id`, `redemption_code_pass_owner_id`, `redemption_code_pass_owner_type`, `redemption_code_pass_type_identifier`, `redemption_code_serial_number`, `redemption_code_type`, `redemption_id`, `redemption_status`, `redemption_type`, `reward_id`, `serial_number`, `store_number`, `subtotal_amount`, `transaction_no`, `transferred_to_id`, `transferred_to_type`, `updated_at`, `web`  |

### Event Attributes

The events that Punchh sends to mParticle are technically groups of events in Punchh. For granular information on the event structure in Punchh, reference the following event attributes:

| Attribute Name | Description |
|---|---|
| event_action | Punchh event operation |
| event_name | Punchh event name |
| event_type | Punchh event type |

For details on other event attributes coordinate with your Punchh account team.


### User Attributes

User Attribute | Description
------ | ---------
Punchh_account_balance_banked_currency | Total banked currency or dollar amount available with the user (Applicable in case of currency based program)
Punchh_account_balance_current_membership_level_name | Name of the user's current membership level.
Punchh_account_balance_last_visit | Last loyalty visit timestamp of the user
Punchh_account_balance_loyalty_points | Total loyalty points earned from checkins/visits
Punchh_account_balance_net_balance | Net Available Balance of Current Account. This value always shows the available balance of the user whether its visits, banked rewards or points.
Punchh_account_balance_net_debits | Total points redeemed/donated/transferred by the user
Punchh_account_balance_pending_points | Pending Points of the User (If checkin is in pending state)
Punchh_account_balance_total_credits | Total Credits of Current Account
Punchh_account_balance_total_debits | Total Debits of Current Account
Punchh_account_balance_total_lifetime_points | Sum of all the loyalty points earned by an user from the time they signed up(excluding expired points).
Punchh_account_balance_total_point_credits | Total Points Credits of User
Punchh_account_balance_total_redeemable _visits | Total redeemable visits available with the user (Applicable in case of visit based program)
Punchh_account_balance_total_visits | Total of the visits that an user has earned by doing loyalty checkins and those visits that were migrated from an older loyalty program(in case a business had an older loyalty program and wants to migrate its users to Punchh's loyalty program).
Punchh_account_balance_unbanked_points | Available points which have not been converted yet for the user (Applicable in case of points conversion based program)
Punchh_account_balance_unredeemed_cards | Total unredeemed cards available with the user (Applicable in case of visit based program)
Punchh_address | Address of the user
Punchh_anniversary | Anniversary of the user
Punchh_birthday | Birthday of the user
Punchh_business_id | Business ID in Punchh
Punchh_city | City where the user lives.
Punchh_confirmation_sent_at | Verification email sent to the user
Punchh_created_at | Timestamp on which user gets created in Punchh
Punchh_current_sign_in_at | Timestamp on which checkin gets created in Punchh
Punchh_current_sign_in_ip | Current sign in user system ip address
Punchh_email | Email address of the user
Punchh_email_confirmation_url | email confirmation url
Punchh_favorite_location | Favourite location ids for a user(Array)
Punchh_favorite_store_numbers | Favourite store numbers for a user(Array)
Punchh_first_name | First name of the user
Punchh_gender | Gender of the user
Punchh_guest_type | Guest type i.e. eclub or loyalty
Punchh_invite_code | Guest invite code
Punchh_joined_at | Loyalty User signed up TImestamp
Punchh_last_activity_at | Timestamp for the last user activity recorded for a user when earned, gifted or redeemed etc.
Punchh_last_name | Last name of the user
Punchh_last_sign_in_at | Timestamp for the last user sign in
Punchh_last_sign_in_ip | Last sign in user system ip address
Punchh_last_user_agent | user device agent from where last login happen
Punchh_marketing_email_opt_in | Whether the user has subscribed to marketing emails or not.
Punchh_marketing_email_subscription | Whether the user has subscribed to marketing emails or not.
Punchh_marketing_pn_opt_in | Whether the user has subscribed to marketing push-notifications or not.
Punchh_marketing_pn_subscription | Whether the user has subscribed to marketing push-notifications or not.
Punchh_phone | Phone number of the user
Punchh_preferred_locale | Preferred language code of the user
Punchh_referral_code | Referral code of the user
Punchh_referred_by_id | User id for referral code
Punchh_referring_full_name | Name of the referral user
Punchh_referring_user_id | ID of the referral user
Punchh_secondary_email | Secondary email of the user is configured when a user signs up with Facebook but doesn't share their email Id. App asks for an alternate email which is kept as the `secondary_email`.
Punchh_sms_subscription | Whether the user has subscribed to SMS services or not.
Punchh_state | State where the user lives.
Punchh_terms_and_conditions_opt_in | End user agreement to terms and conditions setup by business
Punchh_unsubscibe_reason | Unsubscribe reason
Punchh_unsubscribed | Unsubscribe status
Punchh_updated_at | The date and time when the reward was updated for an user in the system.
Punchh_user_status | Status of the user i.e. Active or Ban or Deactivate
Punchh_zip_code | Zip Code where the user lives.
