---
title: Feed
---

[Xenial](https://www.xenial.com/) is a single technology platform that offers enterprise-ready restaurant and food service management solutions, customer engagement tools, and global reach.

## Enable the Integration
* Create two configurations within mParticle - One for Development and one for Production. Each configuration will have a Key and Secret associated with it. 
* Reach out to your Xenial Account Manager with the credentials from both configurations. 
* Xenial will correspondingly set "development" or "production" in the environment field for data sent data to mParticle. 

## Supported User Identities
* Email
* Other 4 - Contains Loyalty Account ID (SVA)

## Supported User Attributes
* xenial_status
* xenial_age
* xenial_gender
* xenial_country
* xenial_zip
* xenial_city
* xenial_state
* xenial_address
* xenial_firstname
* xenial_lastname
* xenial_phone1
* xenial_phone2
* xenial_date_of_birth
* xenial_email_opt_in
* xenial_user_id
* xenial_title

## Supported Event Types

* Custom events
* Commerce events

### Custom Events

Transaction

* Activate                 	 
* Load                     	 
* Redeem Reversal          	 
* Promotion                	 
* Positive Adjustment      	 
* Redeem                   	 
* Load Reversal            	 
* Negative Adjustment      	 
* Expired                  	 
* Escheatment              	 
* Fee                      	 
* Close                    	 
* Transfer                 	 
* Balance Inquiry          	 
* Register                 	 
* Freeze                   	 
* Unfreeze                 	 
* Promo Reversal           	 
* Greet                    	 
* Update Account Fraud Settings
* Preauth                  	 
* Postauth Complete        	 
* Credit                   	 
* Credit Reversal          	 
* Preauth Reversal         	 
* Opt In                   	 
* Cashout                  	 
* Cashout Reversal         	 
* Conversion Negative Adjustment
* Conversion Promotion
* Conversion Negative Adjustment Reversal
* Conversion Promotion Reversal

Account

* Account Data

User

* User Data

Payment (Commerce Event)

* Purchase
* Refund
