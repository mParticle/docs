---
title: Platform Limits
order: 9
---

mParticle imposes limits on the number and length of attributes that can be associated with events and users.

A quick summary of some of the most important limits is below. For more information, see our full [Default Service Limits](/guides/default-service-limits/) guide.

**Events**

* An event can have up to 100 attribute key/value pairs.
* Event names and attribute keys are limited to 256 characters.
* Event attribute values are limited to 4096 characters.

**Users**

* A user can have up to 100 attribute key/value pairs.
* User attribute names are limited to 256 characters.
* User identity values (email, Customer ID, etc) are limited to 256 characters.
* A user attribute value can be a list. These lists are limited to 1000 entries.
* An entry in a user attribute list is limited to 512 characters.
* A user attribute value that is not part of a list is limited to 4096 characters.

Note that Output Services often have their own limits, which can differ from mParticle's. When planning your implementation, check the documentation for your Output Services in the [Integration Center](/integrations/) to make sure you are complying with their limits.
